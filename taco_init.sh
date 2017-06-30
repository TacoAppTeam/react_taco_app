#!/bin/bash

# Add any extra init steps here
command pushd "vws_taco_database"
    python3.6 data_tools.py
    sqlite3 taco.db ".read populate_data.sql"
command popd