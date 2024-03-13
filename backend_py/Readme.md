# Backend setup

"""
README

You can run the code using the following command:
```
sudo docker compose build
sudo docker compose up
```

Open the console in Jupyter Lab and run the following command to start the backend server:

```
!uvicorn src.main:create_app --reload --factory --host 0.0.0.0 --port 80
```
Note: To kill a process in Jupyter console, you need to press I twice. 