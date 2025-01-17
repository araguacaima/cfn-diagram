const { program } = require("commander");
const mxGenerator = require("../../graph/MxGenerator");
const path = require("path");

let ciMode = false;

program
    .command("draw.io")
    .alias("d")
    .option(
        "-t, --template-file [templateFile]",
        "Path to template or cdk.json file",
        "template.yaml or cdk.json"
    )
    .option(
        "-c, --ci-mode",
        "Disable terminal/console interactivity",
        false
    )
    .option("--stacks [stacks]", "Comma separated list of stack name(s) to include. Defaults to all.")
    .option("-o, --output-file [outputFile]", "Name of output file")
    .option(
        "-co, --cdk-output [outputPath]",
        "CDK synth output path",
        `cdk.out`
    )
    .option(
        "-s, --skip-synth",
        "Skips CDK synth",
        false
    )
    .option(
        "-e, --exclude-types [excludeTypes...]",
        "List of resource types to exclude when using CI mode"
    )
    .description("Generates a draw.io diagram from a CloudFormation template")
    .action(async (cmd) => {
        if (!cmd.outputFile) {
            cmd.outputFile = path.join(path.dirname(cmd.templateFile),"template.drawio");
        }
        if (!cmd.excludeTypes) {
            cmd.excludeTypes = [];
        }
        cmd.excludeTypes.push("AWS::CDK::Metadata")
        await mxGenerator.generate(cmd);
    });


