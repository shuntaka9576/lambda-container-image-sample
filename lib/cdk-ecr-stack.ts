import * as cdk from "@aws-cdk/core";
import * as ecr from "@aws-cdk/aws-ecr";

export class EcrStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const repository = new ecr.Repository(this, "SampleNodeApp", {
      repositoryName: "sample-node-app",
      imageScanOnPush: true,
    });

    repository.addLifecycleRule({
      tagPrefixList: ["prod"],
      maxImageCount: 9999,
    });
    repository.addLifecycleRule({ maxImageAge: cdk.Duration.days(30) });

    new cdk.CfnOutput(this, "ecrArn", {
      value: `${repository.repositoryArn}`,
    });
  }
}
