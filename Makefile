REPOSITORY_URI = $(AWS_ACCOUNT_ID).dkr.ecr.ap-northeast-1.amazonaws.com/sample-node-app
IMAGE_TAG := $(shell git rev-parse --short HEAD)

build:
	yarn build
	docker image build . -t $(REPOSITORY_URI):latest
	docker tag $(REPOSITORY_URI):latest $(REPOSITORY_URI):$(IMAGE_TAG)
exec:
	docker run -it --entrypoint '' $(REPOSITORY_URI):latest /bin/sh
push:
	docker push $(REPOSITORY_URI):$(IMAGE_TAG)
	docker push $(REPOSITORY_URI):latest
emu:
	docker run -p 9000:8080 $(REPOSITORY_URI):latest
curl:
	curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{"eventName": "test"}'
