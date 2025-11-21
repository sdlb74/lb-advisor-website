# 🚀 Guide de Déploiement sur GitHub Pages

Votre site est prêt ! Voici comment le mettre en ligne gratuitement et facilement avec GitHub Pages.

## Étape 1 : Préparer GitHub

1.  Allez sur [GitHub.com](https://github.com) et connectez-vous.
2.  Créez un **nouveau repository** (bouton "+" en haut à droite -> "New repository").
3.  Nommez-le (ex: `lb-advisor-website`).
4.  Laissez-le en **Public** (nécessaire pour GitHub Pages gratuit).
5.  Ne cochez **pas** "Add a README file".
6.  Cliquez sur **Create repository**.

## Étape 2 : Envoyer votre Code

Ouvrez votre terminal (dans VS Code) et tapez ces commandes une par une :

```bash
# 1. Initialiser Git (si ce n'est pas déjà fait)
git init

# 2. Ajouter tous les fichiers
git add .

# 3. Faire le premier commit
git commit -m "Initial commit - Site complet"

# 4. Relier à votre nouveau repository GitHub
# Remplacez VOTRE_NOM et VOTRE_REPO par les vôtres (GitHub vous donne cette ligne exacte sur la page de création)
git remote add origin https://github.com/VOTRE_NOM/lb-advisor-website.git

# 5. Envoyer le code
git push -u origin main
```

*(Si `git push` échoue car la branche s'appelle `master`, essayez `git push -u origin master`)*

## Étape 3 : Configurer GitHub Pages

1.  Sur la page de votre repository GitHub, allez dans l'onglet **Settings** (Paramètres).
2.  Dans le menu de gauche, cliquez sur **Pages**.
3.  Sous **Build and deployment** > **Source**, choisissez **GitHub Actions**.
4.  GitHub va détecter que c'est un projet Next.js et vous proposer un workflow. Cliquez sur **Configure**.
5.  GitHub va créer un fichier `nextjs.yml`. Cliquez simplement sur **Commit changes**.

**C'est tout !** 
GitHub va maintenant construire votre site automatiquement.
Dans quelques minutes, retournez dans **Settings > Pages**, et vous verrez le lien de votre site en ligne (ex: `https://votre-nom.github.io/lb-advisor-website/`).

---

## 💡 Mise à jour future

Chaque fois que vous ferez une modification (ajout d'article, changement de texte) :

1.  Faites vos modifs.
2.  Dans le terminal :
    ```bash
    git add .
    git commit -m "Mise à jour contenu"
    git push
    ```
3.  Le site se mettra à jour tout seul en quelques minutes !
