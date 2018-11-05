namespace :scrape do

  desc "Get the Astronomy Photo of the Day"
  task apod: :environment do
    agent = Mechanize.new(user_agent_alias: 'Mac Safari')
    
    url = "https://apod.nasa.gov/apod/ap#{Date.today.strftime('%y%m%d')}.html"
    page = agent.get(url)
    photo_url = page.links[1].uri.to_s.start_with?('http') ? nil : "https://apod.nasa.gov/apod/#{page.links[1].uri.to_s}"
    title = page.search('b').first.text.strip
    date = Date.parse(page.search('p')[1].children[0].text.strip)
    description = page.search('p')[2].text.gsub('Explanation: ', '')

    Photo.create(title: title, url: url, photo_url: photo_url, date: date, description: description) unless Photo.find_by_date(date)
  end
end