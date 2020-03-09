# CBC

This is a little project to learn mern stack & docker/docker-compose. And to try to have a cool manager for my comics.

Run the app:
```
docker-compose up
```

Clear docker:
```
docker-compose down
docker rm $(docker ps -a -q)
docker volume rm $(docker volume ls -q)
docker rmi $(docker images -a -q)
docker-compose up
```
