# r/drumkits downloader

## Steps

- Create a list of links to the files, posts and their owners from this week
- Put that in the json
- Go through each link and determine if its downloadable
  - Create some sort of config file (yaml) that will hold data for the search
    - Blacklist of words
    - How many days back
    - Words to filter by - all allowed by default
  - Check if there is an API for that file hosting website
- Overwrite json with all that new data
- Create a folder with a current date as a name
- Copy Credits file into it
- Go through each link
  - Download it
  - If needed unzip it
  - If needed delete zip file
  - Go inside the folder, check the names of the files for a presence of keywords like 'snares' or 'kicks'
    - Ignore the weird MACOS folder that is often created for some reason
    - If there are no folders with the words check for presence in other folders (yaaay recursion)
      - If none are found check the names of the files inside the folder for matches
    - If there are folders with these names then interpret these names and get each file from them and
      - Check if it is an audio format
      - Rename it to: _random_noun_ - _username_from_github_
      - Move it to a folder of the same category
    - Add credits data to the credits file
    - Delete the folder
