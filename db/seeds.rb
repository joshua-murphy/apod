print "\nDeleting and seeding database... "

Photo.destroy_all
d = Date.today
success_count = 0
fails = []

while d != Date.parse('Sun, 31 Dec 2017')
  
  year1 = d.year.digits[1]
  year2 = d.year.digits[0]
  month1 = d.month.digits[1] || 0
  month2 = d.month.digits[0]
  day1 = d.day.digits[1] || 0
  day2 = d.day.digits[0]

  agent = Mechanize.new
  agent.user_agent_alias = 'Mac Safari'
  begin
    url = "https://apod.nasa.gov/apod/ap#{year1}#{year2}#{month1}#{month2}#{day1}#{day2}.html"
    page = agent.get(url)
    photo_url = page.links[1].uri.to_s.start_with?('http') ? nil : "https://apod.nasa.gov/apod/#{page.links[1].uri.to_s}"
    title = page.search('b').first.text.strip
    date = Date.parse(page.search('p')[1].children[0].text.strip)
    description = page.search('p')[2].text.gsub('Explanation: ', '')
    photo = Photo.new(title: title, url: url, photo_url: photo_url, date: date, description: description)
    puts photo.save ? 
      "\nPhoto saved to database."
    : 
      "\nPhoto found but not saved. It is likely a video, or has an incompatible image url."
    success_count += 1
    rescue => e
      fails.push(url)
  end
  d = d.yesterday
  
end

puts "scraping complete: #{success_count} successful, #{fails.count} failed."

if fails.count > 0
  puts "Failed scrapes:"
  fails.each do |url|
    puts "  #{url}"
  end
end

puts ""