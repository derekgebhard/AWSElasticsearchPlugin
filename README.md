Easy support and manage AWS Elasticsearch with Serverless.

**Requirements:**
* Serverless
* AWS provider

## How it works

EsPlugin solves makes it easy to support Elasticsearch in Serverless by managing infrastructure, cluster config, and index creation. It provides the Es host paths via ENV variables automatically to your code.

## Setup


### Installation

Install via npm in the root of your Serverless service:

```sh
npm install serverless-elasticsearch --save-dev
```

Add the plugin to the `plugins` array in your Serverless `serverless.yml`:

```yml
plugins:
  - serverless-elasticsearch
```

### Configure

You must add configuration to the `custom:` section in your Serverless `serverless.yml` for the plugin to run. Below are all of the config settings available with defaults called out:

```yml
custom:
  EsPlugin:
    # Comming Soon
```

**Options should be tweaked depending on Es needs:**
* Some resources to get you started on research: [link1](https://www.elastic.co/blog/found-sizing-elasticsearch), [link2](https://aws.amazon.com/blogs/database/get-started-with-amazon-elasticsearch-service-how-many-data-instances-do-i-need/), [link3](https://aws.amazon.com/blogs/database/get-started-with-amazon-elasticsearch-service-t-shirt-size-your-domain/) 

## Deployment

Once everything is configured EsPlugin will run on `sls deploy` and `sls remove`

```sh
serverless deploy
serverless remove
```

Note: You expect your Es clusters to stay even after running `sls remove` given you want to retain your data, use the DeletionPolicy: 'Retain' config setting.

You can also run the `sls es` or `sls es deploy` command to only deploy and configure your Elasticsearch clusters.

```sh
serverless es deploy
```

To remove  `sls es` or `sls es deploy` command to only deploy and configure your Elasticsearch clusters.

## Gotchas

None known as of right now.

## Cost

AWS Elasticsearch pricing [here](https://aws.amazon.com/elasticsearch-service/pricing/). You will need to add together the costs for all clusters you will support [default 1 per stage deployed].

#### Example

Estimated costs for Free Tier not included + Default options + 3 stages [dev, preprod, prod]. Check AWS pricing for latest costs.
* Clusters: 3
* Individual Cluster Cost: ($81.81)
** Instances: 3x t2.small.elasticsearch	($0.036 per hour, $25.92 per month): 3x$25.92 = $77.76
** Storage: 10GB General Purpose SSD for each instance ($0.135 per GB / month): 3x10x$0.135 = $4.05
* Total = $245.43 per month (3 x $81.81)

CloudWatch costs are not in this example because they are very low.

## Future Features

* Command for taking manual snapshots of clusters
* Automated S3 snapshots and restores for shutting down dev ES clusters when not in use
* Automated population of DynamoDB data to Es cluster

## Contribute

Help us making this plugin better and future proof.

* Clone the code
* Install the dependencies with `npm install`
* Create a feature branch `git checkout -b new_feature`
* Add Jest unit tests under tests/unit
* Lint and run unit tests with standard `npm test`
* Check code coverage with `npm run coverage`
* Open pull request :)

## License

This software is released under the Apache 2.0 license. See [the license file](LICENSE) for more details.
