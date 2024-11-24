for $book in /library/book
where xs:decimal($book/price) > 200 and xs:decimal($book/price) < 300
return $book
