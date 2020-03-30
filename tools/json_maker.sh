# Creates json file of form {"status":"TWITT_CONTENT"}
# USAGE: ./json_maker.sh YYYY_MM_DD_X
# twitt_content.txt must contain only one line. Any line breaks you want to make in youe twitt should be marked with \n symbol.
filename=$1
content=`cat ./twitt_content.txt`
echo "{\"status\":\""$content"\"}" > $filename.json
