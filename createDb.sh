sh "docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/Projects/restaurants/backend/data:/var/lib/postgresql/data postgres"

sh "createdb -h localhost -p 5432 -U postgres resdb"
