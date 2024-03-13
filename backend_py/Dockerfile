FROM pytorchlightning/pytorch_lightning

RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt-get install -y unzip graphviz curl musescore3
RUN pip install --upgrade pip

WORKDIR /app

COPY ./requirements.txt /app
RUN pip install -r /app/requirements.txt

#RUN jupyter nbextension enable --py widgetsnbextension

ENV PYTHONPATH="${PYTHONPATH}:/app"