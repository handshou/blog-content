import * as dotenv from 'dotenv';
dotenv.config()
import { exec } from "node:child_process";
import fs from 'fs';

if (process.argv.length === 2) {
    console.error('Expected at least one argument!');
    process.exit(1);
}

if (process.argv[2]) {
    const secretsFilePath = process.argv[2];
    console.log('Secrets path is present.');

    // read env
    const envPath = '.env';
    fs.access(envPath, fs.F_OK, (error) => {
        if (error) {
            console.error(error);
            process.exit(1);
        } 
    })
    let envs = fs.readFileSync(envPath, 'utf8').toString().split("\n");

    // read generated secret file and exec cli command to create gh secret
    let secrets;
    fs.readFile(secretsFilePath, 'utf8', (error, data) => {
        if (error) {
            console.error(error);
            return;
        }

        secrets = data.toString().split("\n");
    })

    for (const env of envs) {
        const parts = env.toString().split("=");
        const name = parts[0].toUpperCase();
        const secret = parts[1];
        if (secret && secret.length === 0) continue;
        createSecret(name, secret);
    }
    console.log("Done creating secrets")
    process.exit(0);
}

function createSecret(name, secret) {
    if (!secret) return;

    function printOutput(error, stdout, stderr) {
        console.log("STDOUT:", stdout, ", STDERR:", stderr);
    }
    exec(`gh secret set ${name} && ${secret}`, printOutput);
}