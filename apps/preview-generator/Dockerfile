FROM python:3.11

WORKDIR /backend


RUN apt-get update && \
    apt-get install gcc -y && \
    apt-get clean

COPY requirments.txt ./

RUN pip install -r requirments.txt && \
    rm -rf /root/.cache/pip

RUN playwright install
RUN playwright install-deps 

COPY . .
