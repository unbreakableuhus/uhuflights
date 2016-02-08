import json
import re

def airlines():
  ans = []
  with open('airlines.csv', 'r') as fin:
    text = fin.read().split('\n')
    for i, line in enumerate(text):
      ans.append(line.replace('"', '').split(','))

  with open('airlines.json', 'w') as fout:
    fout.write(json.dumps(ans, encoding='utf-8'))

def cities():
  ans = {}
  places = {}
  with open('songs.csv') as fin:
    text = fin.read().split('\n')
    for i, line in enumerate(text):
      if i > 0:
        split_line = re.findall('"[^"]*"', line);
        if len(split_line) > 2:
          song, country, city = split_line[0], split_line[1].lower(), split_line[2].lower()
          song = song.replace('"', '')
          country = country.replace('"', '')
          city = city.replace('"', '')
          key = country.lower() + '^' + city.lower()
          place_songs = places.get(key, [])
          place_songs.append(song)
          places[key] = place_songs

  with open('cities.csv', 'r') as fin:
    text = fin.read().split('\n')
    for i, line in enumerate(text):
      if i > 0:
        split_line = line.replace('"', '').split(',')
        if len(split_line) > 1:
          key = split_line[0].lower() + '^' + split_line[1].lower()
          split_line.append(places.get(key, []))
          ans[key] = split_line

  with open('cities.json', 'w') as fout:
    fout.write(json.dumps(ans, encoding='utf-8'))

def routes():
  places = {}
  airlines = {}
  with open('routes.csv', 'r') as fin:
    text = fin.read().split('\n')
    for i, line in enumerate(text):
      if i > 0:
        try:
          #populate airline
          split_line = line.replace('"', '').split(',')
          airline_routes = airlines.get(split_line[0], [])
          airline_routes.append([n.lower() for n in split_line[1:]])
          airlines[split_line[0]] = airline_routes
          #populate places
          source_city, source_country = split_line[2].lower(), split_line[3].lower()
          key = source_city + '^' + source_country
          place_routes = places.get(key, [])
          place_routes.append([n.lower() for n in split_line])
          places[key] = place_routes
    
          destination_city, destination_country = split_line[4].lower(), split_line[5].lower()
          key = destination_city + '^' + destination_country
          place_routes = places.get(key, [])
          place_routes.append([n.lower() for n in split_line])
          places[key] = place_routes
        except:
          pass
  
  for k, v in airlines.iteritems():
    with open('airlines/' + k + '.json', 'w') as fout:
      fout.write(json.dumps(v, encoding='utf-8'))
  
  for k, v in places.iteritems():
    with open('places/' + k.replace('/', '-').replace(' ', '_') + '.json', 'w') as fout:
      fout.write(json.dumps(v, encoding='utf-8'))

if __name__ == '__main__':
  airlines()
  cities()
  routes()

