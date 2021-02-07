#!/bin/bash

token=$(curl -k --data 'grant_type=client_credentials&client_id=internal&client_secret=817a14da-d57f-471b-aaa0-7f8636918689' 'http://localhost:9080/auth/realms/jhipster/protocol/openid-connect/token' | sed 's/.*access_token":"\([^"]*\).*/\1/')
export token
echo $token
