# Own it: how to publish changes to BuildIT

This is your site, Tomas. Here's how to change it and put it live. You only need your GitHub account.

## How it works

- The site lives in this GitHub repo.
- Change a file in GitHub and commit it to the branch **fix/qa-round-1** (or merge a pull request into it).
- Wait about 2 minutes. It's live on **www.buildit.net.au** (and buildit-websites.github.io).
- The **Actions** tab shows a **green tick** when it's published. A red cross means it didn't publish, so check what changed.
- Small fix? You can commit straight to fix/qa-round-1. Bigger change? Use a new branch and a pull request (steps below) so you can check it first.

## 1. Edit a page

1. Open this repo on GitHub.
2. Make sure the branch picker (top left) says **fix/qa-round-1**.
3. Click the file you want to change, for example `about.html` or `index.html`.
4. Click the **pencil icon** (Edit this file).
5. Change the words you want. Only change the text between the tags, not the bits inside `< >`.

Tip: press Ctrl+F (Cmd+F on a Mac) to find the sentence you want to change.

## 2. Save it on a new branch

1. Click **Commit changes…** (top right).
2. Write a short message, like `Update my About story`.
3. Choose **Create a new branch for this commit and start a pull request**.
4. Click **Propose changes**.

## 3. Open a pull request (PR)

1. GitHub shows the "Open a pull request" page.
2. Check the **base** branch says **fix/qa-round-1**.
3. Click **Create pull request**.

## 4. Check your change

- Click the **Files changed** tab. Red lines are removed, green lines are added.
- Read it once more. Check spelling, prices and phone number.
- If something's wrong, open the file on your branch, edit it again and commit. The PR updates by itself.

## 5. Put it live

1. Click **Merge pull request**, then **Confirm merge**.
2. Wait about 2 minutes.
3. Open the **Actions** tab. When the newest run has a **green tick**, it's live.

## 6. Check the live site

1. Open **www.buildit.net.au**.
2. Do a hard refresh so you don't see an old copy:
   - Windows: **Ctrl + Shift + R**
   - Mac: **Cmd + Shift + R**
   - Phone: close the tab and open it again.
3. Check it on your phone too.

## 7. Undo a mistake

Don't panic, everything can be undone.

1. Go to **Pull requests**, then **Closed**, and open the PR you merged.
2. Click the **Revert** button near the bottom.
3. GitHub makes a new PR that undoes it. Click **Create pull request**, then **Merge pull request**.
4. About 2 minutes later (green tick in **Actions**) the site is back to how it was. Hard refresh to check.

## Handy to know

- **Free slots:** in `index.html`, find the five slots that say `Open`. Change one to `Taken` when a client signs on.
- **Reviews:** only add real reviews, word for word, after the client says yes. Never make one up.
- **Not sure?** Open the PR but don't merge it, and ask someone to look first.
