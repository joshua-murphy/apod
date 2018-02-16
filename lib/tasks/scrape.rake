namespace :scrape do

  desc "Get the Astronomy Photo of the Day"
  task apod: :environment do

    year1 = Date.today.year.digits[1]
    year2 = Date.today.year.digits[0]
    month1 = Date.today.month.digits[1] || 0
    month2 = Date.today.month.digits[0]
    day1 = Date.today.day.digits[1] || 0
    day2 = Date.today.day.digits[0]

    agent = Mechanize.new
    agent.user_agent_alias = 'Mac Safari'
    page = agent.get("https://apod.nasa.gov/apod/ap#{year1}#{year2}#{month1}#{month2}#{day1}#{day2}.html")
    begin
      photo_url = "https://apod.nasa.gov/apod/#{page.links[1].uri.to_s}"
      title = page.search('b').first.text.strip
      date = Date.parse(page.search('p')[1].children[0].text.strip)
      Photo.create(title: title, url: photo_url, date: date)
      puts "\nPhoto saved to database"
      rescue => e
        puts "\nPhoto failed to grab"
      end
    puts "Scraping complete\n "
  end

end