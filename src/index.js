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
    this.options = options;

    this.provider = this.serverless.getProvider('aws');
    this.stage = this.provider.getStage();

    this.hooks = {
      'after:package:initialize': this.afterPackageInitialize.bind(this),
      // 'after:package:createDeploymentArtifacts': this.afterCreateDeploymentArtifacts.bind(this),
      // 'after:deploy:deploy': this.afterDeployFunctions.bind(this),
    };
  }

  /**
   * @description After package initialize hook. Create warmer function and add it to the service.
   *
   * @fulfil {} — Warm up set
   * @reject {Error} Warm up error
   *
   * @return {(boolean|Promise)}
   * */
  afterPackageInitialize() {
    return this.serverless.cli.log('Elasticsearch: no clusters to create %s', this.stage);
  }
}

/** Export WarmUP class */
module.exports = EsPlugin;
