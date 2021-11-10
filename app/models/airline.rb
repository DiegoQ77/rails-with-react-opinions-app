class Airline < ApplicationRecord
  has_many :reviews

  before_create :slugify

  def slugify
    self.slug = name.parameterize # Poner en minuscula los valores
  end

  def avg_score
    # p reviews.average(:title)
    return 0 unless reviews.size.positive?

    p 'avg_score 13 -------'
    p reviews
    p reviews.average(:score)

    reviews.average(:score).round(2).to_f
  end

  def logica
    10
  end
end
