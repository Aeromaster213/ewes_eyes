FROM pytorchlightning/pytorch_lightning

RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt-get install -y unzip graphviz curl musescore3
RUN pip install --upgrade pip

WORKDIR /app

COPY ./requirements.txt /app
RUN DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt install -y python3.10-venv && python3 -m venv .venv
RUN pip install --upgrade -r /app/requirements.txt

RUN jupyter lab clean
RUN jupyter labextension enable @jupyter-widgets/jupyterlab-manager

ENV PYTHONPATH="${PYTHONPATH}:/app"