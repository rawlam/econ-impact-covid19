import psycopg2
from flask import Flask, jsonify

app = Flask(__name__)
app.debug = True


#################################################
# Flask Routes
#################################################

@app.route("/")
def homepage():
    return (
        f"Welcome to the Project 3 App!<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/stocks<br/>"
        f"/api/v1.0/sectors<br/>"
        f"/api/v1.0/quotes<br/>"
        f"/api/v1.0/us-covid-data<br/>"
    )

#################################################
# Define Data Routes
#################################################

# Define stocks route that will return the data from your PostgreSQL database
@app.route("/api/v1.0/stocks")
def stocks():

    # Connect to your PostgreSQL database
    conn = psycopg2.connect(host='localhost', dbname='financial_db', user='postgres', password='CSMl1890')
    cur = conn.cursor()

    # Execute a query to get the data from the database
    cur.execute('SELECT * FROM stock')

    # Fetch all the rows from the query result
    rows = cur.fetchall()

    # Create a list to store the results
    result = []

    # Iterate over the rows and append the data to the result list
    for row in rows:
        result.append({'symbol_id': row[0], 'name': row[1], 'sector_id': row[2]})
        
    # Close the cursor and the database connection
    cur.close()
    conn.close()

    # Return the result as a JSON response
    return jsonify(result)


# Define sectors route that will return the data from your PostgreSQL database
@app.route("/api/v1.0/sectors")
def sectors():

    # Connect to your PostgreSQL database
    conn = psycopg2.connect(host='localhost', dbname='financial_db', user='postgres', password='CSMl1890')
    cur = conn.cursor()

    # Execute a query to get the data from the database
    cur.execute('SELECT * FROM sector')

    # Fetch all the rows from the query result
    rows = cur.fetchall()

    # Create a list to store the results
    result = []

    # Iterate over the rows and append the data to the result list
    for row in rows:
        result.append({'sector_id': row[0], 'name': row[1]})
        
    # Close the cursor and the database connection
    cur.close()
    conn.close()

    # Return the result as a JSON response
    return jsonify(result)


# Define the quotes that will return the data from your PostgreSQL database
@app.route("/api/v1.0/quotes")
def quotes():

    # Connect to your PostgreSQL database
    conn = psycopg2.connect(host='localhost', dbname='financial_db', user='postgres', password='CSMl1890')
    cur = conn.cursor()

    # Execute a query to get the data from the database
    cur.execute('SELECT * FROM quotes')

    # Fetch all the rows from the query result
    rows = cur.fetchall()

    # Create a list to store the results
    result = []

    # Iterate over the rows and append the data to the result list
    for row in rows:
        result.append({'date': row[0], 'symbol_id': row[1], 'open': row[2]})
        
    # Close the cursor and the database connection
    cur.close()
    conn.close()

    # Return the result as a JSON response
    return jsonify(result)


# Define us-covid-data quotes that will return the data from your PostgreSQL database
@app.route("/api/v1.0/us-covid-data")
def us_covid_data():

    # Connect to your PostgreSQL database
    conn = psycopg2.connect(host='localhost', dbname='financial_db', user='postgres', password='CSMl1890')
    cur = conn.cursor()
    
    # Execute a query to get the data from the database
    cur.execute('SELECT * FROM covid_19_data')

    # Fetch all the rows from the query result
    rows = cur.fetchall()

    # Create a list to store the results
    result = []

    # Iterate over the rows and append the data to the result list
    for row in rows:
        result.append({'date_reported': row[0], 
                       'new_cases': row[1], 
                       'cumulative_cases': row[2],
                       'new_deaths': row[3],
                       'cumulative_deaths': row[4],
                       })
        
    # Close the cursor and the database connection
    cur.close()
    conn.close()

    # Return the result as a JSON response
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
