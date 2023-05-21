// eslint-disable-next-line
const concurrently = require('concurrently')

const versionBump = []
const changelog = []
const publish = [
  {
    name: 'publish',
    command: 'npm run rollup && npm publish',
    prefixColor: 'red',
  },
]

const concurrentOpts = {
  restartTries: 3,
  prefix: '{time} {name} |',
  timestampFormat: 'HH:mm:ss',
}

switch (process.argv[2]) {
  case 'patch':
    versionBump.push({
      name: 'bump:version',
      command: `npm version patch && git add package.json package-lock.json`,
      prefixColor: 'blue',
    })
    changelog.push({
      name: 'release:patch',
      command:
        "changelog -p && git add CHANGELOG.md && git commit -m 'docs: update CHANGELOG.md and version bump' && git push origin && git push origin --tags",
      prefixColor: 'yellow',
    })
    break
  case 'minor':
    versionBump.push({
      name: 'bump:version',
      command: `npm version minor && git add package.json package-lock.json`,
      prefixColor: 'blue',
    })
    changelog.push({
      name: 'release:minor',
      command:
        "changelog -m && git add CHANGELOG.md && git commit -m 'docs: update CHANGELOG.md and version bump' && git push origin && git push origin --tags",
      prefixColor: 'yellow',
    })
    break
  case 'major':
    versionBump.push({
      name: 'bump:version',
      command: `npm version major && git add package.json package-lock.json`,
      prefixColor: 'blue',
    })
    changelog.push({
      name: 'release:major',
      command:
        "changelog -M && git add CHANGELOG.md && git commit -m 'docs: update CHANGELOG.md and version bump' && git push origin && git push origin --tags",
      prefixColor: 'yellow',
    })
    break
  default:
    break
}

const { result } = concurrently(versionBump, concurrentOpts)

result
  .then(() => concurrently(changelog, concurrentOpts))
  .then(() => concurrently(publish, concurrentOpts))
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e.message)
  })
