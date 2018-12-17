/**
 * @module serverless-elasticsearch
 *
 * @see {@link https://serverless.com/framework/docs/providers/aws/guide/plugins/}
 *
 * @requires 'bluebird'
 * */

/**
  * @class EsPlugin
  * @classdesc Serverless plugin for managing AWS ES Clusters
  * */
class EsPlugin {
  /**
   * @description Serverless Elasticsearch
   * @constructor
   *
   * @param {!Object} serverless - Serverless object
   * @param {!Object} options - Serverless options
   * */
  constructor(serverless, options) {
    /** Serverless variables */
    this.serverless = serverless;
    this.options = options || {};

    // State plugin only works for AWS provider
    this.provider = this.serverless.getProvider('aws');

    // Command line usage of just Es deployment via these commands ('sls es')
    this.commands = {
      es: {
        usage: 'Managers ES resources for serverless srvice.',
        lifecycleEvents: ['create', 'configure'],
        commands: {
          deploy: {
            usage: 'Deploy ES cluster and configure it.',
            lifecycleEvents: ['create', 'configure'],
          },
          remove: {
            usage: 'Remove ES cluster and configure it.',
            lifecycleEvents: ['remove'],
          },
        },
        options: {
          escluster: {
            usage: 'The specific cluster name from config to deploy.',
            shortcut: 'c',
          },
          stage: {
            usage: 'The stage to deploy.',
            shortcut: 's',
          },
        },
      },
    };

    // Take action on lifecycle events from other commands and our commands
    this.hooks = {
      'after:package:initialize': this.createEsClusters.bind(this),
      'before:aws:deploy:deploy:updateStack': this.configureEsClusters.bind(this),
      'after:remove:remove': this.removeEsClusters.bind(this),
      'before:offline:start:init': this.createAndConfigureEsClusters.bind(this),
      'before:offline:start': this.createAndConfigureEsClusters.bind(this),
      'es:create': this.createEsClusters.bind(this),
      'es:configure': this.configureEsClusters.bind(this),
      'es:deploy:create': this.createEsClusters.bind(this),
      'es:deploy:configure': this.configureEsClusters.bind(this),
      'es:remove:remove': this.removeEsClusters.bind(this),
    };
  }

  /**
   * @description Parse config for plugin to Es clusters to create from serverless.yml file.
   *
   * @param {Object} stage - The stage being deployed
   * @param {Object} cluster - The cluster to get config for. Null returns all.
   *
   * @return {Object[]} EsClusters - Array of EsClusters objects
   * */
  parseConfig(stage, cluster) {
    this.serverless.cli.log(`Elasticsearch: Running parseConfig for stage: ${stage} and cluster: ${cluster}`);
  }

  /**
   * @description Set Env params for service to make URL of es cluster available to code.
   *
   * @param {Object[]} esClusters - The Es clusters created
   * */
  setEsEnvVarPaths(esClusters) {
    this.serverless.cli.log(`Elasticsearch: Running setEsEnvVarPaths for ${esClusters}`);
  }

  /**
   * @description Do both the creation and configuration of ES Clusters.
   *
   * @return {Promise}
   * */
  createAndConfigureEsClusters() {
    const stage = this.provider.getStage();
    const cluster = this.options.escluster;
    this.serverless.cli.log(`Elasticsearch: Running createAndConfigureEsClusters. Stage: ${stage}; Cluster: ${cluster}`);
  }

  /**
   * @description Create ES clusters in AWS.
   *
   * @fulfil {} — Es clusters initialized and starting
   * @reject {Error} Failed to create clusters
   *
   * @return {Promise}
   * */
  createEsClusters() {
    const stage = this.provider.getStage();
    const cluster = this.options.escluster;
    this.serverless.cli.log(`Elasticsearch: Running createEsClusters. Stage: ${stage}; Cluster: ${cluster}`);
    // Step 1: Parse Config
    // Step 2: Call ESInfrastructureManagerAWS to Create
    // Step 3: Set Env Variables for Cluster Paths
  }

  /**
   * @description Configure Es clusters and create indexes by call Es hosts.
   *
   * @fulfil {} — Es cluster configuration set and specified indexes created.
   * @reject {Error} Failure to set configuration settings or create indexes.
   *
   * @return {Promise}
   * */
  configureEsClusters() {
    const stage = this.provider.getStage();
    const cluster = this.options.escluster;
    this.serverless.cli.log(`Elasticsearch: Running configureEsClusters. Stage: ${stage}; Cluster: ${cluster}`);
    // Step 1: Parse Config
    // Step 2: Call ES Cluster Manager to modify cluster settings and index
  }

  /**
   * @description Delete AWS Es resources.
   *
   * @fulfil {} — Es resources removed from AWS.
   * @reject {Error} Es resources still exist in AWS.
   *
   * @return {Promise}
   * */
  removeEsClusters() {
    const stage = this.provider.getStage();
    const cluster = this.options.escluster;
    this.serverless.cli.log(`Elasticsearch: Running removeEsClusters. Stage: ${stage}; Cluster: ${cluster}`);
    // Step 1: Parse Config
    // Step 2: Call ESInfrastructureManagerAWS to Remove
  }
}

/** Export WarmUP class */
module.exports = EsPlugin;
