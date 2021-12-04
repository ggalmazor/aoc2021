# Advent of Code 2021

## Day 1

[nodejs/1/solution.mjs](solution.mjs)
[c++/1/solution.cpp](solution.cpp)

I initially solved the problem using a sliding window because I really like them. However, I had to implement my own version of a sliding window array slicer because NodeJS doesn't come with one. 

It started like this:
```javascript
function window(list) {
  const output = [];
  for (let i = 0; i < list.length - 1; i += 1)
    output.push(list.slice(i, i + 2));
  return output;
}
```

And then I had to abstract away the size of the window for part 2:
```javascript
function window(list, size = 2) {
  const output = [];
  for (let i = 0; i < list.length - size + 1; i += 1)
    output.push(list.slice(i, i + size));
  return output;
}
```

It was fun to implement it on c++ too because I had to learn about templates:

```C++
template<typename T>
vector<T> slice(vector<T> &v, int from, int to) {
    auto start = v.begin() + from;
    auto end = v.begin() + to + 1;
    vector<T> result(to - from + 1);
    copy(start, end, result.begin());
    return result;
}

template<typename T>
vector<vector<T>> window(vector<T> &v, int size) {
    vector<vector<T>> tuples;
    tuples.reserve(v.size() - size + 1);
    for (int i = 0; i < v.size() - size + 1; i++)
        tuples.push_back(slice(v, i, i + size));
    return tuples;
}
```

## Day 2

[nodejs/2/solution.mjs](solution.mjs)
[c++/2/solution.cpp](solution.cpp)

For the first part I tried a super naive approach of counting the ups and downs and then subtracting them to compute the depth. I knew this approach was very fragile and probably would bite me on part 2, but I thought it was funny and went for it. 

While I was doing that I realized that my approach didn't account for negative depths. Theoretically, the sub could go up more units than its actual depth, which would mean it would "jump" over the sea line :D. To discard this could actually happen with the input I had, I did a quick test that computed all running depths and found that the value never went negative, which meant that my approach was sound so far.

For part 2 I had to throw away my first approach because I needed to keep a running state of the subs aim, which depends on all the previous ups and downs. 

## Day 3

[nodejs/3/solution.mjs](solution.mjs)

For this challenge I wanted to avoid looping over data all the time and I found a way of computing the "bias" towards `1` or `0` of each bit position by replacing `0` bits with a `-1` and then summing up all the values of each bit position across all data. If the result for a bit position is positive, then there's a bias towards binary `1` (there are more `1`s in that position). If the result is negative, there's a bias for binary `0`, and if the result is `0`, then there's no bias.

For the first part I had to first discard a scenario where I would get a `0` in the bias result for any bit position, which I was able to do thus supporting that my approach was sound.

That would produce a `gammaRate` value for me in a single pass through the data.

```javascript
const gammaRate = parseInt(lines
  .reduce(
    (counts, line) => zip(counts, line.split('')
      .map(v => v === '0' ? -1 : 1)
    ).map(([a, b]) => a + b), 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  )
  .map(count => count > 0 ? '1' : '0')
  .join(''), 2);
```
Reading this expression hurts a bit though :D. Here's a step by step explanation:
- The `reduce` is based on aggregating all bit position biases in that initial `[0, ... ,0]` array I'm feeding into the operation. Each number in that array is the bias for that bit position:
- The reduction function computes the bias for each bit in the `line` I'm iterating through, pairs it with its corresponding bias in `counts` thanks to the `zip` function, and then sums them to produce a new bias array.
- Then, biases are translated back to binary `1`s and `0`s into a string.
- Then the binary string is parsed into an integer.

To compute the `epsilonRate` I computed the bitwise complement of the `gammaRate`. My first attempt involved naively aggregating as many `1`s into a string as the length of the binary representation of the `gammaRate` value to produce the `11...11` mask I needed , and then I realized I could achieve the same with `Math.pow(2, length)-1` that would produce the number I needed for the mask in a more elegant way.

For the second part of the challenge I applied iteratively the same "bias" concept while filtering out lines that didn't match the current search criteria (search for the most or least frequent value in a bit position) 

## Day 4

[nodejs/4/solution.mjs](solution.mjs)

For this challenge I choose the tradeoff of storing numbers twice in the board's state and having to involve more loops to get a simpler solution. I choose to store each number in the board both in its row and column internal state representations.

That way I could get away with a `Line` class that worked both for rows and columns. The `Board` class would act as a line aggregator, with two collections of them: one for `rows` and another one for `cols`.

Honestly this time I was more interested in representing the bingo boards in console, so I used `chalk` to add some colors for the fun of it :)

Both parts are working but I'm not very happy with the duplication of code I created. I didn't find a nice way of reusing more code between parts. 
