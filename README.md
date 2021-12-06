# Advent of Code 2021

## Day 1

[NodeJS solution](nodejs/1/solution.mjs)

[C++ solution.cpp](c++/1/solution.cpp)

[Java solution](java/app/src/main/java/com/github/ggalmazor/aoc2021/days/Day1.java)

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

[nodejs/2/solution.mjs](nodejs/2/solution.mjs)
[c++/2/solution.cpp](c++/2/solution.cpp)

For the first part I tried a super naive approach of counting the ups and downs and then subtracting them to compute the depth. I knew this approach was very fragile and probably would bite me on part 2, but I thought it was funny and went for it. 

While I was doing that I realized that my approach didn't account for negative depths. Theoretically, the sub could go up more units than its actual depth, which would mean it would "jump" over the sea line :D. To discard this could actually happen with the input I had, I did a quick test that computed all running depths and found that the value never went negative, which meant that my approach was sound so far.

For part 2 I had to throw away my first approach because I needed to keep a running state of the subs aim, which depends on all the previous ups and downs. 

## Day 3

[nodejs/3/solution.mjs](nodejs/3/solution.mjs)

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

For the second part of the challenge I applied iteratively the same "bias" concept while filtering out lines that didn't match the current search criteria (search for the most or least frequent value in that bit position) 

## Day 4

[nodejs/4/solution.mjs](nodejs/4/solution.mjs)

For this challenge I chose the tradeoff of storing numbers twice in the board's state and having to involve more loops to get a simpler solution. I choose to store each number in the board both in its row and column internal state representations.

That way I could get away with a `Line` class that worked both for rows and columns. The `Board` class would act as a line aggregator, with two collections of them: one for `rows` and another one for `cols`.

To build the boards I got to reuse the `window` function I used in Day 1. I had to abstract away the step size to iterate the input array while extracting the windows from input, which completed the "sliding window iterator" implementation nicely:

```javascript
function window(list, size, step = 1) {
  const output = [];
  for (let i = 0; i < list.length - size + 1; i += step)
    output.push(list.slice(i, i + size));
  return output;
}
```

With this change, I could extract 5 line windows every 6 lines from the input lines:

```
                38 92 26 65 77
                59 39  4 57 16
                91 45 35 36  2
                34 40 89  8 62
                96 28 31 88 33
                
             ⌜  50 79 88 34  0  ⌝                
             |  56 46  5 17 31  |
             |  29  6 38 78 68  | window size: 5
step size: 6 |  75 57 15 44 83  |
             |  89 45 43 85 72  ⌟
             ⌞
                29  8 56 15 33
                 7 14 51 88 67
                91 32 62 18 73
                53 63 49 34 46
                70 25 77 87 31
```

Honestly this time I was more interested in representing the bingo boards in console, so I used `chalk` to add some colors for the fun of it :)

![image](https://user-images.githubusercontent.com/205913/144708471-59b4ac9f-439f-44bf-a77d-7ee4b3d2fe18.png)

Both parts are working but I'm not very happy with the duplication of code I created. I didn't find a nice way of reusing more code between parts. 

## Day 5

[nodejs/5/solution.mjs](nodejs/5/solution.mjs)

This one was very fun to solve overall but I got a bit frustrated handling all the loops to iterate over coordinates until I decided to implement the `range` function to abstract away concerns about the direction of the range:

```javascript
function range(from, to, inclusiveTo = true) {
  const numbers = [];
  const step = (to - from) >= 0 ? 1 : -1;
  let n = from;
  const requestedLength = inclusiveTo ? Math.abs(to - from) + 1 : Math.abs(to - from);
  while (numbers.length !== requestedLength) {
    numbers.push(n);
    n += step;
  }
  return numbers;
}
```
I'm sure there are better implementations, and I'm aware that this implementation is very limited (no option to set a step size, etc) but it supports what I need to do now and I can expand it in the future if needed.

I also had a lot of fun plotting the map into a canvas to produce a png image. This is the 10 by 10 example from the challenge's description:

![image](https://user-images.githubusercontent.com/205913/144744692-57c613cf-087b-4b65-bd7e-571be22c2035.png)

And here are the two maps of both parts of the challenge

![part1](https://user-images.githubusercontent.com/205913/144744594-a95e14ba-8cda-4406-be90-ad12a38dd666.png)
![part2](https://user-images.githubusercontent.com/205913/144744599-49255e61-ffc9-4467-9362-95e33c618a96.png)

I used a color palette with 5 colors:
- 0 gets grey
- 1 gets light yellow
- 2 gets orange
- 3 gets orange-red
- 4 or more get red

I did a couple of things that aren't really needed such as the plotting of the map, or being able to change the criteria to produce the final result of each part :shrug:
