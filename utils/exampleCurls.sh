#!/bin/bash
cd "$(dirname "$0")"

. ./getBearerToken.sh
echo "Accessors:"
curl -H "Authorization: Bearer $token" http://localhost:8080/api/accessors
echo -e "\n\nApplications:"
curl -H "Authorization: Bearer $token" http://localhost:8080/api/applications
echo -e "\n\nOrganizations:"
curl -H "Authorization: Bearer $token" http://localhost:8080/api/organizations
echo -e "\n\nEntitlements:"
curl -H "Authorization: Bearer $token" http://localhost:8080/api/entitlements
echo
