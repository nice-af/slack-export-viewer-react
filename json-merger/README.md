# JSON merge script

This script merges all files of the [slackdump](https://github.com/rusq/slackdump) output into a single JSON file.
It uses any JSON files put into the `input/` directory and merges them into a single JSON file in the `output/` directory where the keys of the resulting object are the folder structure in the `input/` folder.

This makes it much easier for the end user to provide the data as single file to the web interface.