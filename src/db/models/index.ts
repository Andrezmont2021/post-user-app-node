import { Sequelize } from 'sequelize';
import { setupRelationships } from './relationships';
import { initializeModels } from './init';

export const setupModels = (sequelize: Sequelize) => {
  initializeModels(sequelize);
  setupRelationships();
};
