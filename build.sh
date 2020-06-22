echo 'INSTALLING ADONIS'
npm i -g @adonisjs/cli
echo 'RUNNING MIGRATIONS'
adonis migration:run --force
echo 'SERVING APPLICATION'
adonis serve
