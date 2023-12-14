import { Command } from 'commander';
import { execSync } from 'child_process';

export function runCSpell(pattern: string, config: string) {
    const command = `cspell ${pattern} --config=${config}`;
    try {
        const output = execSync(command, { encoding: 'utf-8' });
        console.log(output);
    } catch (error) {
        console.error(`Error executing cspell: ${error}`);
    }
}

export const command = new Command('cspell')
    .option(
        '--pattern <pattern>',
        'Glob pattern for files to check',
        'docs/{*.md,*/*.md,*/*/*.md,*/*/*/*.md,*/*/*/*/*.md,*/*/*/*/*/*.md,*/*/*/*/*/*/*.md,*/*/*/*/*/*/*.md}'
    ) // Default pattern; note that the glob pattern requires specifying all levels of subdirectories from zk cmd
    .option('--config <config>', 'Path to configuration file', './spellcheck/cspell.json') // Default config path
    .description('Run cspell on specified files')
    .action((cmd) => {
        runCSpell(cmd.pattern, cmd.config);
    });
