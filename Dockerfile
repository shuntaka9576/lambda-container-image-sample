FROM public.ecr.aws/lambda/nodejs:12

ARG FUNCTION_DIR="/functions"
COPY dist/ $FUNCTION_DIR
