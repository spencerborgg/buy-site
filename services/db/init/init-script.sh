#!/bin/bash

adminUser="admin"
psql postgres --echo-errors -f ./create-db.sql
/bin/bash ./schema-script.sh $adminUser
/bin/bash ./seed-script.sh $adminUser
