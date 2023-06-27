В репозитории 2 ветки: `main` (для production) и `develop` (здесь ведется разработка)

#### 1. Делаем `pull` из `develop `

#### 2. Создаем новую ветку из develop. Имя по схеме:
 ```markdown
 CHE-<number>.<short_desc> . Например: CHE-12.Add-router
 ```

#### 3. В таск трекере для задачи, над которой начинаем работать, меняем статус c `Todo` на `In progress`:
![Screenshot](/docs/images/task-status.png)

#### 4. Делаем коммиты, именуя их по схеме:
```markdown
feat: <short desc> - новая фича
chore: <short desc> - улучшения, рефакторинг
fix: <short desc> - фиксы
Например: `feat: add new page`
```

#### 5. `git push` + создаем PR на `develop` ветку.
Обязательно добавляем описание PR.
```markdown
Например:
[CHE-12] Add router
-add router
-refactoring App component
```
Тегаем команду для ревью.

#### 6. После апрувов - `rebase` в `develop`.
![Screenshot](/docs/images/git-merge.png)

#### 7. В конце спринта заливаем `develop` в `main`
