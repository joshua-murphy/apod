print "\nDeleting and seeding photos... "

Photo.destroy_all
current_day = Date.today
success_count = 0
fails = []

while current_day > Date.today.last_month
  agent = Mechanize.new(user_agent_alias: 'Mac Safari')
  begin
    url = "https://apod.nasa.gov/apod/ap#{current_day.strftime('%y%m%d')}.html"
    page = agent.get(url)
    photo_url = page.links[1].uri.to_s.start_with?('http') ? nil : "https://apod.nasa.gov/apod/#{page.links[1].uri.to_s}"
    title = page.search('b').first.text.strip
    date = Date.parse(page.search('p')[1].children[0].text.strip)
    description = page.search('p')[2].text.gsub('Explanation: ', '')

    Photo.create!(title: title, url: url, photo_url: photo_url, date: date, description: description) ? success_count += 1 : fails << url
  rescue => e
    fails << url
  end

  current_day -= 1.day
end

puts "complete. #{success_count} successful, #{fails.count} failed."
puts "Failed scrapes:\n  #{fails.join("\n  ")}" if fails.count > 0