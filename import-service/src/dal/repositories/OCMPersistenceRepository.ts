import { injectable } from 'inversify';
import mongoose from 'mongoose';
import { POI } from '@domain/models/ocm/POI.js';
import { CoreReferenceData } from '@domain/models/ocm/CoreReferenceData.js';
import { OCMPersistenceRepository } from '@domain/interfaces/repositories/OCMPersistenceRepository.js';
import { POIModel } from '@dal/dao/ocm/POI.js';
import { ConnectionTypeModel } from '@dal/dao/ocm/ConnectionType.js';
import { CountryModel } from '@dal/dao/ocm/Country.js';
import { OperatorInfoModel } from '@dal/dao/ocm/OperatorInfo.js';
import { StatusTypeModel } from '@dal/dao/ocm/StatusType.js';
import { SupplyTypeModel } from '@dal/dao/ocm/SupplyType';

@injectable()
// eslint-disable-next-line prettier/prettier
export class OCMPersistenceRepositoryImplementation implements OCMPersistenceRepository {
  storeReferenceData = async (data: CoreReferenceData): Promise<void> => {
    const { ConnectionTypes, Countries, Operators, StatusTypes, CurrentTypes } =
      data;
    await this.processModel(ConnectionTypeModel, ConnectionTypes);
    await this.processModel(CountryModel, Countries);
    await this.processModel(OperatorInfoModel, Operators);
    await this.processModel(StatusTypeModel, StatusTypes);
    await this.processModel(SupplyTypeModel, CurrentTypes);
  };

  storePOIs = async (pois: POI[]): Promise<void> => {
    const documents = await Promise.all(
      pois.map(async (poi) => {
        let poiDocument = await POIModel.findOneAndUpdate({ ID: poi.ID }, poi, {
          new: true,
        });
        // create new POI if needed
        if (!poiDocument) {
          poiDocument = new POIModel(poi);
        }
        // find and populate OperatorInfo
        const operatorDocument = await OperatorInfoModel.findOne({
          ID: poi.OperatorID,
        });
        if (operatorDocument) {
          poiDocument.OperatorInfo = operatorDocument;
        }
        // find and populate StatusType
        const statusTypeDocument = await StatusTypeModel.findOne({
          ID: poi.StatusTypeID,
        });
        if (statusTypeDocument) {
          poiDocument.StatusType = statusTypeDocument;
        }
        // find and populate Country for AddressInfo
        if (poi.AddressInfo.CountryID) {
          const countryDocument = await CountryModel.findOne({
            ID: poi.AddressInfo.CountryID,
          });
          if (countryDocument) {
            poiDocument.AddressInfo.Country = countryDocument;
          }
        }
        return poiDocument;
      })
    );
    // process Connections
    await Promise.all(
      documents.map(async (originalDocument) => {
        const connections = await Promise.all(
          originalDocument.Connections.map(async (connection) => {
            const connectionType = await this.findAndPopulate(
              ConnectionTypeModel,
              connection.ConnectionTypeID,
              'ConnectionType'
            );
            const statusType = await this.findAndPopulate(
              StatusTypeModel,
              connection.StatusTypeID,
              'StatusType'
            );
            const currentType = await this.findAndPopulate(
              SupplyTypeModel,
              connection.CurrentTypeID,
              'CurrentType'
            );

            return {
              ...connection,
              ...connectionType,
              ...statusType,
              ...currentType,
            };
          })
        );
        const updatedDocument = {
          ...originalDocument.toObject(),
          Connections: connections,
        };
        return updatedDocument;
      })
    );
    await POIModel.bulkSave(documents);
  };

  getLastPOIUpdate = async (): Promise<Date | null> => {
    const poiDocument = await POIModel.findOne().sort('-DateLastStatusUpdate');
    return poiDocument ? poiDocument.DateLastStatusUpdate : null;
  };

  cleanUp = async (): Promise<void> => {
    await POIModel.deleteMany();
    await ConnectionTypeModel.deleteMany();
    await CountryModel.deleteMany();
    await OperatorInfoModel.deleteMany();
    await StatusTypeModel.deleteMany();
    await SupplyTypeModel.deleteMany();
  };

  private async processModel<T>(Model: mongoose.Model<any>, data: T[]) {
    await Model.deleteMany();
    await Model.bulkSave(data.map((item) => new Model(item)));
  }

  private async findAndPopulate<D extends mongoose.Document>(
    model: mongoose.Model<D>,
    fieldId: any,
    fieldName: string
  ) {
    if (fieldId) {
      const document = await model.findOne({ ID: fieldId });
      if (document) {
        return { [fieldName]: document };
      }
    }
    return {};
  }
}
