
var canonize = function(k) {
  return k.replace(/\[.*\]/,'').replace(/<[^>]+>/g,'x').toLowerCase()
}

var commands = [

  { left: "workspace", right: "index", direction: "status",
    cmd: "status",
    tags: 'Basic Snapshotting'},
  { left: "workspace", right: "index", direction: "status",
    cmd: "diff",
    tags: 'Basic Snapshotting, Inspection and Comparison,Patching'},
  { left: "workspace", right: "local_repo", direction: "status",
    cmd: "diff <commit or branch>",
    tags: 'Basic Snapshotting,Inspection and Comparison,Patching'},

  { left: "workspace", right: "index", direction: "up",
    cmd: "add <file... or dir...>",
    tags: 'Basic Snapshotting'},
  { left: "workspace", right: "index", direction: "up",
    cmd: "add -u",
    tags: 'Basic Snapshotting'},
  { left: "workspace", right: "index", direction: "up",
    cmd: "rm <file...>",
    tags: 'Basic Snapshotting'},
  { left: "workspace", right: "index", direction: "up",
    cmd: "mv <file...>",
    tags: 'Basic Snapshotting'},

  { left: "workspace", right: "local_repo", direction: "up",
    cmd: "commit -a [-m 'msg']",
    tags: 'Basic Snapshotting'},

  { left: "workspace", right: "index", direction: "dn",
    cmd: "checkout <file(s)|dir>",
    tags: 'Branching and Merging'},

  { left: "index", right: "index", direction: "status",
    cmd: "reset HEAD <file(s)...>",
    tags: 'Basic Snapshotting'},

  { left: "index", right: "local_repo", direction: "dn",
    cmd: "reset --soft HEAD^",
    tags: 'Basic Snapshotting'},

  { left: "workspace", right: "local_repo", direction: "dn",
    cmd: "reset --hard",
    tags: 'Basic Snapshotting'},


  { left: "workspace", right: "local_repo", direction: "dn",
    cmd: "checkout <branch>",
    tags: 'Branching and Merging'},
  { left: "workspace", right: "local_repo", direction: "dn",
    cmd: "checkout -b <name of new branch>",
    tags: 'Branching and Merging'},

  { left: "workspace", right: "local_repo", direction: "dn",
    cmd: "merge <commit or branch>",
    tags: 'Branching and Merging'},

  { left: "workspace", right: "local_repo", direction: "dn",
    cmd: "rebase <upstream>",
    tags: 'Patching'},


  { left: "workspace", right: "local_repo", direction: "dn",
    cmd: "cherry-pick <commit>",
    tags: 'Patching'},
  { left: "workspace", right: "local_repo", direction: "dn",
    cmd: "revert <commit>"},

  { left: "index", right: "local_repo", direction: "status",
    cmd: "diff --cached [<commit>]",
    tags: 'Basic Snapshotting,Inspection and Comparison,Patching'},
  { left: "index", right: "local_repo", direction: "up",
    cmd: "commit [-m 'msg']",
    tags: 'Basic Snapshotting'},
  { left: "index", right: "local_repo", direction: "up",
    cmd: "commit --amend",
    tags: 'Basic Snapshotting'},

  { left: "local_repo", right: "local_repo", direction: "status",
    cmd: "log",
    tags: 'Branching and Merging, Inspection and Comparison'},
  { left: "local_repo", right: "local_repo", direction: "status",
    cmd: "diff <commit> <commit>",
    tags: 'Basic Snapshotting, Inspection and Comparison,Patching'},
  { left: "local_repo", right: "local_repo", direction: "status",
    cmd: "branch",
    tags: 'Branching and Merging'},
  { left: "local_repo", right: "local_repo", direction: "status",
    cmd: "branch -d <branch>",
    tags: 'Branching and Merging'},
  { left: 'local_repo', right: 'remote_repo', direction: 'dn',
    cmd: "branch --track <new> <remote/branch>",
    tags: 'Branching and Merging'},


  { left: "workspace", right: "remote_repo", direction: "dn",
    cmd: "clone <repo>",
    tags: 'Creating Projects'},
  { left: "workspace", right: "remote_repo", direction: "dn",
    cmd: "pull <remote> <refspec>",
    tags: 'Sharing and Updating'},
  { left: "workspace", right: "remote_repo", direction: "dn",
    cmd: "reset --hard <remote>/<branch>",
    tags: 'Basic Snapshotting'},
  { left: "local_repo", right: "remote_repo", direction: "dn",
    cmd: "fetch <remote> <refspec>",
    tags: 'Sharing and Updating'},
  { left: "local_repo", right: "remote_repo", direction: "up",
    cmd: "push",
    tags: 'Sharing and Updating'},
  { left: "local_repo", right: "remote_repo", direction: "up",
    cmd: "push <remote> <branch>",
    tags: 'Sharing and Updating'},
  { left: "local_repo", right: "remote_repo", direction: "up",
    cmd: "push <remote> <branch>:<branch>",
    tags: 'Sharing and Updating'},

  { left: "remote_repo", right: "remote_repo", direction: "status",
    cmd: "branch -r",
    tags: 'Branching and Merging'},

  { left: "remote_repo", right: "remote_repo", direction: "status",
    cmd: "push <remote> :<branch>",
    tags: 'Sharing and Updating'},

  { left: "workspace", right: "workspace", direction: "dn",
    cmd: "clean",
    tags: 'Administration' },

  { left: "stash", right: "workspace", direction: "dn",
    cmd: "stash save [<msg>]",
    tags: 'Branching and Merging' },
  { left: "stash", right: "workspace", direction: "up",
    cmd: "stash apply [<name>]",
    tags: 'Branching and Merging'},
  { left: "stash", right: "workspace", direction: "up",
    cmd: "stash pop",
    tags: 'Branching and Merging'},
  { left: "stash", right: "stash", direction: "status",
    cmd: "stash list",
    tags: 'Branching and Merging'},
  { left: "stash", right: "stash", direction: "status",
    cmd: "stash show [<stash>]",
    tags: 'Branching and Merging'},
  { left: "stash", right: "stash", direction: "status",
    cmd: "stash drop [<name>]",
    tags: 'Branching and Merging'},
  { left: "stash", right: "stash", direction: "status",
    cmd: "stash clear",
    tags: 'Branching and Merging'},
  { left: "stash", right: "local_repo", direction: "up",
    cmd: "stash branch <branchname> [<stash>]",
    tags: 'Branching and Merging'}

];


en = {
  commands: {
    "status": "status",
    "diff": "diff",
    "diff x": "diff <commit or branch>",
    "add x": "add <file... or dir...>",
    "add -u": "add -u",
    "rm x": "rm <file...>",
    "mv x": "mv <file...>",
    "commit -a ": "commit -a [-m 'msg']",
    "checkout x": "checkout <branch>",
    "reset HEAD x": "reset HEAD <file(s)...>",
    "reset --soft HEAD^": "reset --soft HEAD^",
    "reset --hard": "reset --hard",
    "checkout -b x": "checkout -b <name of new branch>",
    "merge x": "merge <commit or branch>",
    "rebase x": "rebase <upstream>",
    "cherry-pick x": "cherry-pick <commit>",
    "revert x": "revert <commit>",
    "diff --cached ": "diff --cached [<commit>]",
    "commit ": "commit [-m 'msg']",
    "commit --amend": "commit --amend",
    "log": "log",
    "diff x commit": "diff <commit> <commit>",
    "branch": "branch",
    "branch -d x": "branch -d <branch>",
    "branch --track x remote/branch": "branch --track <new> <remote/branch>",
    "clone x": "clone <repo>",
    "pull x refspec": "pull <remote> <refspec>",
    "reset --hard x/branch": "reset --hard <remote>/<branch>",
    "fetch x refspec": "fetch <remote> <refspec>",
    "push": "push",
    "push x branch": "push <remote> <branch>",
    "push x branch:branch": "push <remote> <branch>:<branch>",
    "branch -r": "branch -r",
    "push x :branch": "push <remote> :<branch>",
    "clean": "clean",
    "stash save ": "stash save [<msg>]",
    "stash apply ": "stash apply [<stash>]",
    "stash pop": "stash pop",
    "stash list": "stash list",
    "stash show ": "stash show [<stash>]",
    "stash drop ": "stash drop [<stash>]",
    "stash clear": "stash clear",
    "stash branch x ": "stash branch <branchname> [<stash>]"
  },
  "status": "Displays paths that have differences between the index file and the current HEAD commit, paths that have differences between the workspace and the index file, and paths in the workspace that are not tracked by git.",
  "diff": "Displays the differences not added to the index.",
  "diff <commit or branch>": "View the changes you have in your workspace relative to the named <commit>. You can use HEAD to compare it with the latest commit, or a branch name to compare with the tip of a different branch",
  "add <file... or dir...>": "Adds the current content of new or modified files to the index, thus staging that content for inclusion in the next commit. Use `add --interactive` to add the modified contents in the workspace interactively to the index.",
  "add -u": "Adds the current content of modified (NOT NEW) files to the index.  This is similar to what 'git commit -a' does in preparation for making a commit.",
  "rm <file...>": "Remove a file from the workspace and the index.",
  "mv <file...>": "Move file in the workspace and the index.",
  "commit -a [-m 'msg']": "Commit all files changed since your last commit, except untracked files (ie. all files that are already listed in the index). Remove files in the index that have been removed from the workspace.",
  "checkout <file(s)|dir>": "Updates the file or directory in the workspace, overwriting any local changes. Does NOT switch branches.",
  "reset HEAD <file(s)...>": "Remove the specified files from the next commit. Resets the index but not the working tree (i.e., the changed files are preserved but not marked for commit) and reports what has not been updated.",
  "reset --soft HEAD^": "Undo the last commit, leaving changes in the the index.",
  "reset --hard": "Matches the workspace and index to the local tree. WARNING: Any changes to tracked files in the working tree since commit are lost. Use this if merging has resulted in conflicts and you'd like to start over. Pass ORIG_HEAD to undo the most recent successful merge and any changes after.",
  "checkout <branch>": "Switches branches by updating the index and workspace to reflect the specified branch, <branch>, and updating HEAD to be <branch>.",
  "checkout -b <name of new branch>": "Create a branch and switch to it",
  "merge <commit or branch>": "Merge changes from <branch name> into current branch.\rUse `&#8209;&#8209;no-commit` to leave changes uncommitted.",
  "rebase <upstream>": "Reverts all commits since the current branch diverged from <upstream>, and then re-applies them one-by-one on top of changes from the HEAD of <upstream>.",
  "cherry-pick <commit>": "Integrate changes in the given commit into the current branch.",
  "revert <commit>": "Reverse commit specified by <commit> and commit the result. This requires your working tree to be clean (no modifications from the HEAD commit).",
  "diff --cached [<commit>]": "View the changes you staged vs the latest commit. Can pass a <commit> to see changes relative to it.",
  "commit [-m 'msg']": "Stores the current contents of the index in a new commit along with a log message from the user describing the changes.",
  "commit --amend": "Modify the last commit with the current index changes.",
  "log": "Show recent commits, most recent on top. Options:\r`&#8209;&#8209;decorate` with branch and tag names on appropriate commits\r`&#8209;&#8209;stat` with stats (files changed, insertions, and deletions) \r`&#8209;&#8209;author=<author>`  only by a certain author\r`&#8209;&#8209;after=\"MMM DD YYYY\"` ex. (\"Jun 20 2008\") only commits after a certain date\r`&#8209;&#8209;before=\"MMM DD YYYY\"` only commits that occur before a certain date \r`&#8209;&#8209;merge` only the commits involved in the current merge conflicts",
  "diff <commit> <commit>": "View the changes between two arbitrary commits",
  "branch": "List all existing branches. Option -r causes the remote-tracking branches to be listed, and option -a shows both.",
  "branch -d <branch>": "Delete an specified branch. Use -D to force.",
  "branch --track <new> <remote/branch>": "Create a new local branch that tracks a remote branch.",
  "clone <repo>": "Download the repository specified by <repo> and checkout HEAD of the master branch.",
  "pull <remote> <refspec>": "Incorporates changes from a remote repository into the current branch. In its default mode, `git pull` is shorthand for `git fetch` followed by `git merge FETCH_HEAD`.",
  "reset --hard <remote>/<branch>": "Reset local repo and working tree to match a remote branch. Use `reset &#8209;&#8209;hard origin/master` to throw away all commits to the local master branch. Use this to start over on a failed merge.",
  "fetch <remote> <refspec>": "Download objects and refs from another repository.",
  "push": "update the server with your commits across all branches that are *COMMON* between your local copy and the server.Local branches that were never pushed to the server in the first place are not shared",
  "push <remote> <branch>": "Push new (or existing) branch to remote repository",
  "push <remote> <branch>:<branch>": "Push new branch to remote repository with a different name",
  "branch -r": "List remote branches",
  "push <remote> :<branch>": "Remove a remote branch. Literally &quot;push nothing to this branch&quot; ",
  "clean": "Cleans the working tree by recursively removing files that are not under version control, starting from the current directory.",
  "stash save [<msg>]": "Save your local modifications to a new stash, and run git reset &#8209;&#8209;hard to revert them. The <msg> part is optional and gives the description along with the stashed state. For quickly making a snapshot, you can omit both \"save\" and <msg>.",
  "stash apply [<stash>]": "Move changes from the specified stash into the workspace. The latest stash is the default.",
  "stash pop": "Applies the changes from the last (or specified) stash and then removes the given stash.",
  "stash list": "List the stashes that you currently have.",
  "stash show [<stash>]": "Show the changes recorded in the stash as a diff between the stashed state and its original parent. When no <stash> is given, shows the latest one.",
  "stash drop [<stash>]": "Remove a single stashed state from the stash list. When no <stash> is given, it removes the latest one.",
  "stash clear": "Remove all the stashed states. Note that those states will then be subject to pruning, and may be impossible to recover.",
  "stash branch <branchname> [<stash>]": "Creates and checks out a new branch named <branchname> starting from the commit at which the <stash> was originally created, applies the changes recorded in <stash> to the new working tree and index. \rIf that succeeds, and <stash> is a reference of the form stash@{<revision>}, it then drops the <stash>. When no <stash> is given, applies the latest one. \rThis is useful if the branch on which you ran git stash save has changed enough that git stash apply fails due to conflicts. Since the stash is applied on top of the commit that was HEAD at the time git stash was run, it restores the originally stashed state with no conflicts."
}

fr = {
  "status": "Affiche les chemins des fichiers qui diffèrent entre l'INDEX et la HEAD du commit courant, ceux des fichiers qui diffèrent entre le WORKSPACE et l'INDEX, et ceux des fichiers qui sont dans le WORKSPACE mais ne sont pas encore suivis par git.",
  "diff": "Affiche les différences entre le WORKSPACE et l'INDEX.",
  "diff COMMIT ou BRANCHE": "Affiche les différences entre le WORKSPACE et le COMMIT ou la BRANCHE spécifié. Vous pouvez utiliser HEAD pour comparer avec le dernier commit.",
  "add FICHIER(S) ou DOSSIER(S)": "Ajoute à l'INDEX le contenu des FICHIER(S) ou DOSSIER(S), nouveaux ou modifiés, les plaçant ainsi en attente d'inclusion dans le prochain commit. Utilisez 'git add --interactive' pour ajouter de manière interactive à l'INDEX les contenus modifiés dans le WORKSPACE.",
  "add -u": "Ajoute à l'INDEX le contenu des fichiers (EXISTANTS) modifiés. C'est ce que fait 'git commit -a' en préparation à un commit.",
  "rm FICHIER(S)": "Supprime des FICHIER(S) du WORKSPACE et de l'INDEX.",
  "mv FICHIER(S)": "Déplace des FICHIER(S) du WORKSPACE et de l'INDEX.",
  "commit -a -m 'MESSAGE'": "Fait un commit de tous les fichiers qui ont changé depuis le dernier commit, à l'exception des fichiers non suivis (ie. tous les fichiers qui sont dans l'INDEX). Supprime de l'INDEX les fichiers qui ont été supprimés du WORKSPACE.",
  "checkout FICHIER(S) ou DOSSIER(S)": "Met à jour les FICHIER(S) ou DOSSIER(S) dans WORKSPACE en écrasant toutes modifications locales. Ne PAS changer de branches.",
  "reset HEAD FICHIER(S)": "Supprime les FICHIER(S) spécifiés du prochain commit. Réinitialise l'INDEX mais pas le WORKSPACE (i.e. les fichiers modifiés sont préservés mais non marqués pour commit) et indique ce qui n'a pas été mis à jour.",
  "reset --soft HEAD^": "Défait le dernier commit en laissant les modifications dans l'INDEX.",
  "reset --hard": "Fait correspondre le WORKSPACE et l'INDEX avec le LOCAL REPOSITORY. ATTENTION : toutes les modifications apportées à des fichiers suivis dans le WORKSPACE depuis le dernier commit sont perdues. Utilisez ceci lorsqu'une fusion a engendré des conflits et que vous souhaitez recommencer. Précisez ORIG_HEAD pour défaire la dernière fusion réussie et les modifications qui ont suivi.",
  "checkout BRANCHE": "Échange les branches en mettant à jour le WORKSPACE et l'INDEX pour charger la BRANCHE spécifiée en positionnant la HEAD dessus.",
  "checkout -b BRANCHE": "Crée une nouvelle BRANCHE et se positionne dessus.",
  "merge COMMIT ou BRANCHE": "Fusionne les modifications du COMMIT ou de la BRANCHE dans la branche courante. Utilisez --no-commit pour ignorer les modifications n'ayant pas encore fait l'objet d'un commit.",
  "rebase SOURCE": "Défait tous les commits effectués depuis que la branche à divergé de SOURCE puis les refait tous un par un sur les modifications apportées à la HEAD de SOURCE.",
  "cherry-pick COMMIT": "Intègre les modifications du COMMIT spécifié dans la branche courante.",
  "revert COMMIT": "Défait le COMMIT spécifié puis fait un commit du résultat. Cela nécessite que le WORKSPACE soit propre (sans modifications sur la HEAD du commit).",
  "diff --cached [COMMIT]": "Montre les modifications que vous avez placé dans le STASH par rapport au dernier commit. Vous pouvez préciser un COMMIT pour voir juste les modifications le concernant.",
  "commit -m 'MESSAGE'": "Enregistre le contenu de l'INDEX dans un nouveau commit en y associant un MESSAGE utilisateur décrivant les modifications.",
  "commit --amend": "Modifie le dernier commit en y apportant les modifications se trouvant dans l'INDEX.",
  "log": "Montre les commits récents, les plus récents au début. Options : --decorate avec les noms de branches et d'étiquettes sur les commits, --stat avec des statistiques (fichiers modifiés, insertions et suppressions), --author=AUTEUR seuleument d'un certain AUTEUR, --after=\"MMM JJ AAAA\" ex. (\"Jun 20 2008\") limité aux commits faits après une certaine date, --before=\"MMM JJ AAAA\" limité aux commits faits avant une certaine date, --merge limité aux commits concernés par les conflits de fusion courants.",
  "diff COMMIT_1 COMMIT_2": "Montre les modifications entre deux commits.",
  "branch": "Liste les branches locales existantes. L'option -r permet de lister les branches distantes et l'option -a montre les branches locales et distantes.",
  "branch -d BRANCHE": "Supprime la BRANCHE spécifiée. Utilisez -D pour forcer la suppression.",
  "branch --track BRANCHE BRANCHE_DISTANTE": "Crée une BRANCHE locale qui suit la BRANCHE_DISTANTE.",
  "clone DÉPÔT_DISTANT": "Télécharge le DÉPÔT_DISTANT et se positionne sur la HEAD de sa branche master.",
  "pull DÉPÔT_DISTANT RÉFÉRENCE": "Récupère les modifications associées à la RÉFÉRENCE du DÉPÔT_DISTANT et les fusionne dans la branche courante.",
  "reset --hard DÉPÔT_DISTANT BRANCHE": "Réinitialise le WORKSPACE et le LOCAL REPOSITORY pour les faire correspondre à la BRANCHE du DÉPÔT_DISTANT. Utilisez 'git reset --hard origin/master' pour rejeter tous les commits du LOCAL REPOSITORY. Utilisez ceci pour reprendre après une fusion qui a échoué.",
  "fetch DÉPÔT_DISTANT RÉFÉRENCE": "Télécharge les objets et les références associés à la RÉFÉRENCE du DÉPÔT_DISTANT.",
  "push": "Met à jour le serveur en appliquant les commits sur toutes les branches *COMMUNNES* au LOCAL REPOSITORY et au serveur. Les branches locales qui n'ont jamais été poussées sur le serveur ne sont pas partagées.",
  "push DÉPÔT_DISTANT BRANCHE": "Pousse la BRANCHE spécifiée vers le DÉPÔT_DISTANT.",
  "push DÉPÔT_DISTANT BRANCHE_1:BRANCHE_2": "Pousse la nouvelle BRANCHE_1 sur le DÉPÔT_DISTANT en la renommant BRANCHE_2.",
  "branch -r": "Liste les branches distantes.",
  "push DÉPÔT_DISTANT :BRANCHE": "Supprime la BRANCHE du DÉPÔT_DISTANT.",
  "clean": "Nettoie le WORKSPACE en supprimant récursivement les fichiers qui ne sont pas sous le contrôle de version, en commençant par le répertoire courant.",
  "stash save ['MESSAGE']": "Enregistre les modifications locales dans le STASH puis fait un 'git reset --hard' pour les défaire. Le 'MESSAGE' optionnel donne la description associée à l'état enregistré dans le STASH. Pour faire un instantanné rapide, vous pouvez omettre à la fois \"save\" et le 'MESSAGE'.",
  "stash apply [ÉTAT]": "Déplace les modifications associées à l'ÉTAT du STASH vers le WORKSPACE. Le dernier STASH est pris par défaut.",
  "stash pop": "Applique les modifications du dernier état du STASH puis les supprime du STASH.",
  "stash list": "Liste les états dans le STASH.",
  "stash show [ÉTAT]": "Montre les modifications associées à l'ÉTAT spécifié sous la forme d'un diff entre l'ÉTAT et son parent initial. Lorsqu'aucun ÉTAT n'est précisé, le dernier est montré.",
  "stash drop [ÉTAT]": "Supprime l'ÉTAT du STASH. Lorsqu'aucun ÉTAT n'est précisé, le dernier est supprimé.",
  "stash clear": "Supprime tous les états du STASH. Notez que ces états seront alors candidats à l'élagage et pourront être impossible à restaurer.",
  "stash branch BRANCHE [ÉTAT]": "Crée et charge une nouvelle BRANCHE à partir du commit d'où provient l'ÉTAT puis applique les modifications enregistrées dans l'ÉTAT aux nouveaux WORKSPACE et INDEX. Si cela réussit, l'ÉTAT devient une référence de la forme ÉTAT@{RÉVISION} et l'ÉTAT est supprimé. Lorsqu'aucun ÉTAT n'est donné, le dernier est appliqué. Ceci est utile si une branche sur laquelle vous avez fait un 'stash' a suffisemment changée pour que 'stash apply' échoue à cause de conflits. Puisque l'état est apliqué sur le commit qui était en HEAD au moment où le 'stash' a été effectué, l'état original est restauré sans conflits."
}


for (var i = 0; i < commands.length; i++) {
//  commands[i].docs = en[commands[i].cmd]
//  commands[i].docs = fr[commands[i].cmd]
}
