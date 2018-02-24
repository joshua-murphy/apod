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
    url = "https://apod.nasa.gov/apod/ap#{year1}#{year2}#{month1}#{month2}#{day1}#{day2}.html"
    page = agent.get(url)
    begin
      photo_url = page.links[1].uri.to_s.start_with?('http') ? nil : "https://apod.nasa.gov/apod/#{page.links[1].uri.to_s}"
      title = page.search('b').first.text.strip
      date = Date.parse(page.search('p')[1].children[0].text.strip)
      description = page.search('p')[2].text.gsub('Explanation: ', '')
      if Photo.where(title: title, date: date).count == 0
        photo = Photo.new(title: title, url: url, photo_url: photo_url, date: date, description: description)
        puts photo.save ? 
          "\nPhoto saved to database."
        : 
          "\nPhoto found but not saved. It is likely a video, or has an incompatible image url."
      else
        puts "\nPhoto found but not saved. It appears to already be in the database."
      end
      rescue => e
        puts "\nPhoto failed to grab or save."
      end
    puts "Scraping complete.\n "
  end

end