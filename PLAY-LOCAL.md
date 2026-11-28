# Play Bush Pilot VR on your Windows PC

The game runs in Chrome or Edge on your PC, with a Quest headset over Link (or SteamVR). `http://localhost` counts as a secure context, so WebXR works without https. Keeping a private copy on your machine also means pack assets that must not be publicly downloadable can stay in this folder.

## One-time setup

1. Install [Git for Windows](https://git-scm.com/download/win). The default options are fine.
2. In Command Prompt, PowerShell or Git Bash, go to the folder you want the game in and run:

       git clone https://github.com/Kifsta/bushpilot-vr.git

   Sign in to GitHub when prompted — the repository is private.
3. Optional: install [Python](https://www.python.org/downloads/) and tick **Add python.exe to PATH**. If you skip this, the launcher uses PowerShell, which is already on Windows.

## Each time you play

1. Open the `bushpilot-vr` folder and double-click `play-local.bat`.
2. A browser tab opens at http://localhost:8000/index.html. Leave the launcher window open while you play. Close it, or press Ctrl+C, when you are done.
3. Put on the headset (Quest Link or SteamVR). In Chrome or Edge, press **Enter VR**.

If the update step fails (you are offline, or GitHub asks you to sign in again), the script still starts the copy you already have.

The Pose Lab is at http://localhost:8000/posetool.html.

Windows may ask the first time whether to allow Python or PowerShell on the network. Allowing it on a private network is enough: the server only listens on your PC.
