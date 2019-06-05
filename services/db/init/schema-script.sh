#!/bin/bash

white="\033[0m"
green="\033[0;32m"
cyan="\033[0;36m"

 

for file in `ls "$(dirname $0)"/schema/**.sql | sort`; do
  echo -e "\n${green}Running ${cyan} $file schema scripts${green} on project db...${white}"
    psql postgres -U $1 -d project --echo-errors -q -f $file
  echo ""
done
