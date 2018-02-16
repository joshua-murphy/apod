puts "Seeding database"

d = Date.today

while d != Date.parse('Sun, 31 Dec 2017')
  
  year1 = d.year.digits[1]
  year2 = d.year.digits[0]
  month1 = d.month.digits[1] || 0
  month2 = d.month.digits[0]
  day1 = d.day.digits[1] || 0
  day2 = d.day.digits[0]

  agent = Mechanize.new
  agent.user_agent_alias = 'Mac Safari'
  page = agent.get("https://apod.nasa.gov/apod/ap#{year1}#{year2}#{month1}#{month2}#{day1}#{day2}.html")
  begin
    check_url = page.links[1].uri.to_s.start_with?('http')
    url = check_url ? nil : "https://apod.nasa.gov/apod/#{page.links[1].uri.to_s}"
    title = page.search('b').first.text.strip
    date = Date.parse(page.search('p')[1].children[0].text.strip)
    Photo.create(title: title, url: url, date: date)
    puts "\n#{title} saved to database"
    rescue => e
      puts "\nPhoto failed to grab"
  end
  d = d.yesterday
  
end
puts "Scraping complete\n "