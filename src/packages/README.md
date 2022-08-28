# Submitting a Package

1. Fork this repository.
2. Create a new `json` file in this directory with your package's ID as the filename. (e.g. `kyza.kernel.json`).
3. Follow the template below to give the necessary information to the site:
```json
{
    "id": "person.package",
    "name": "Package Name",
    "description": "Package Description",
    "tags": ["tag", "tag2"],
    "author": "person",
    "source": "https://github.com/person/package/",
    "download": "https://github.com/person/package/releases/latest/download/package.asar"
}
```
4. Open a pull request. If we think your package belongs in the repository, we'll merge it.

## Notes
- `author` must be your GitHub username.
- `id` should be unique to your package, and follow the format `author.packagename` by convention.
- `description`, `tags`, and `source` are optional.
- It's encouraged to include the app that you're targeting in a tag.