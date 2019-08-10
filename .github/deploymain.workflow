workflow "Push to github" {
  on = "push"
  resolves = ["GitHub Action for Heroku", "GitHub Action for Heroku-1"]
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "GitHub Action for Heroku" {
  uses = "actions/heroku@466fea5e8253586a6df75b10e95447b0bfe383c1"
  needs = ["Filters for GitHub Actions"]
  secrets = ["HEROKU_API_KEY"]
  env = {
    HEROKU_APP = "splatoon-ika-bot"
  }
}

action "GitHub Action for Heroku-1" {
  uses = "actions/heroku@466fea5e8253586a6df75b10e95447b0bfe383c1"
  needs = ["Filters for GitHub Actions"]
  secrets = ["HEROKU_API_KEY"]
  env = {
    HEROKU_APP = "splatoon-ika-bot43"
  }
}
