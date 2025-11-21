# 📚 Guide d'Ajout de Contenu - LB Advisor

Ce guide vous explique comment ajouter facilement de nouvelles vidéos et de nouveaux articles sur votre site, sans avoir besoin de toucher au code complexe.

---

## 🎥 Ajouter une Vidéo (Académie)

Toutes les vidéos sont listées dans le fichier : `data/videos.ts`

### Étapes :
1. Ouvrez le fichier `data/videos.ts`.
2. Repérez la liste qui commence par `export const videos = [`.
3. Copiez le bloc ci-dessous et collez-le au début de la liste (juste après le `[`).

```typescript
    {
        id: "mon-nouveau-titre-video", // Identifiant unique (pas d'espaces, utilisez des tirets)
        title: "Titre de la vidéo",
        description: "Description complète de la vidéo...",
        thumbnail: "https://images.unsplash.com/...", // Lien vers l'image miniature
        duration: "10 min",
        level: "beginner", // Choix : 'beginner', 'intermediate', 'advanced'
        youtubeId: "VIDEO_ID", // L'ID de la vidéo YouTube (ex: dQw4w9WgXcQ)
        tags: ["Sujet 1", "Sujet 2"],
        publishDate: "2024-11-21"
    },
```

4. Remplissez les informations.
5. Sauvegardez. Le site se mettra à jour automatiquement !

---

## 📝 Ajouter un Article (Blog)

Tous les articles sont listés dans le fichier : `data/posts.ts`

### Étapes :
1. Ouvrez le fichier `data/posts.ts`.
2. Repérez la liste qui commence par `export const posts = [`.
3. Copiez le bloc ci-dessous et collez-le au début de la liste.

```typescript
    {
        id: "mon-nouvel-article", // Identifiant unique
        title: "Titre de l'article",
        excerpt: "Court résumé qui apparaît sur la page d'accueil du blog...",
        // Le contenu de l'article en HTML simple
        content: `
            <p>Premier paragraphe de votre article.</p>
            
            <h2>Un sous-titre important</h2>
            <p>Un autre paragraphe avec du <strong>texte en gras</strong>.</p>
            
            <ul>
                <li>Point important 1</li>
                <li>Point important 2</li>
            </ul>
        `,
        date: "21 Nov 2024",
        category: "Stratégie",
        image: "https://images.unsplash.com/...", // Image de couverture
        readTime: 5, // Temps de lecture en minutes
        author: "Salim LeBihan"
    },
```

4. Remplissez les informations.
5. Sauvegardez.

---

## 🖼️ Où trouver des images ?
Pour les miniatures et images de couverture, vous pouvez utiliser des liens directs (Unsplash, etc.) ou mettre vos images dans le dossier `public/images/` de votre projet et utiliser le chemin `/images/mon-image.jpg`.
