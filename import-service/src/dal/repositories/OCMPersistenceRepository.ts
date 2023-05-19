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
export class OCMPersistenceRepositoryImplementation
  implements OCMPersistenceRepository
{
  storeReferenceData = async (data: CoreReferenceData): Promise<void> => {
    const { ConnectionTypes, Countries, Operators, StatusTypes, CurrentTypes } =
      data;
    await processModel(ConnectionTypeModel, ConnectionTypes);
    await processModel(CountryModel, Countries);
    await processModel(OperatorInfoModel, Operators);
    await processModel(StatusTypeModel, StatusTypes);
    await processModel(SupplyTypeModel, CurrentTypes);
  };

  storePOIs = async (pois: POI[], isFirstSession: Boolean): Promise<void> => {
    // await POIModel.deleteMany();
    const documents = await Promise.all(
      pois.map(async function (poi) {
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
      documents.map(async (document) => {
        const connections = await Promise.all(
          document.Connections.map(async (connection) => {
            const connectionType = await findAndPopulate(
              ConnectionTypeModel,
              connection.ConnectionTypeID,
              'ConnectionType'
            );
            const statusType = await findAndPopulate(
              StatusTypeModel,
              connection.StatusTypeID,
              'StatusType'
            );
            const currentType = await findAndPopulate(
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
        document.Connections = connections;
        return document;
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
  }
}

async function processModel<T>(model: mongoose.Model<any>, data: T[]) {
  await model.deleteMany();
  await model.bulkSave(data.map((item) => new model(item)));
}

async function findAndPopulate<D extends mongoose.Document>(
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
