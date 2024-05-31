import requests
import re
import csv
from io import StringIO
from openpyxl import Workbook

# URL API
url = 'https://projectsekai.fandom.com/api.php?action=query&pageids=19769&format=json&gaplimit=5&prop=revisions&rvprop=content'

# Send GET request to API
response = requests.get(url)
data = response.json()

# Extract content from the API response
content = data["query"]["pages"]["19769"]["revisions"][0]["*"]

# Define the regex pattern to match table content
pattern = r'\{\|(.*?)\|\}'

# Use regex to find all tables
matches = re.findall(pattern, content, re.DOTALL)

# Assuming there's only one table in this case, you can choose the first match
if len(matches) >= 3:
    table_content = matches[0].strip() + matches[1].strip() + matches[2].strip()
else:
    table_content = ""

# Parse the table content into CSV format
output = StringIO()
writer = csv.writer(output)

# Split the table content by rows
rows = re.split(r'\n[\|\!]-\n', table_content.strip())

# Iterate through rows and write to CSV
for row in rows:
    # Remove leading and trailing '|' and split by '|'
    cols = [col.strip('|') for col in row.split('|')]
    # Clean up each column
    cleaned_cols = []
    for col in cols:
        # Remove rowspan and year attributes
        col = re.sub(r'rowspan\s*=\s*\"?\d+\"?', '', col)
        # Remove year information
        col = re.sub(r'[\"\d]+', '', col)
        # Remove commas and extra spaces
        col = col.replace(',', '').strip()
        # Remove [[...]]'s Anniversary,: patterns
        col = re.sub(r'\[\[(.*?)\'s (Birthday|Anniversary|Event),\s*:', '', col)
        # Remove trailing ':'
        col = col.rstrip(':')
        if col:
            cleaned_cols.append(col)
    # Write cleaned columns to CSV
    if cleaned_cols:
        writer.writerow(cleaned_cols)

# Save to an Excel file
wb = Workbook()
ws = wb.active

# Read CSV content from StringIO and write to Excel
output.seek(0)
reader = csv.reader(output)
for row in reader:
    ws.append(row)

# Save the workbook
wb.save('output.xlsx')

print("Excel file saved successfully.")
