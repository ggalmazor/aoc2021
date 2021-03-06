# Advent of Code 2021

## To do

- [ ] Solve 6 in Java and explore how parallel streams can handle the brute force approach. Also try [Belen's approach](https://github.com/belen-albeza/aoc-2021/blob/main/src/day06.rs) with and without memoizing partial results.
- [x] Solve 8 in Java to explora an approach that precomputes all `7! = 5040` possible permutations of the 7 segments and identifies the specific permutation used on each line instead of extracting a decoder from the samples in them.

## Day 1

[NodeJS solution](nodejs/1/solution.mjs)

[C++ solution.cpp](c++/1/solution.cpp)

[Java solution](java/app/src/main/java/com/github/ggalmazor/aoc2021/day1/Day1.java)

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

[NodeJS](nodejs/2/solution.mjs)

[C++ solution](c++/2/solution.cpp)

[Java solution](java/app/src/main/java/com/github/ggalmazor/aoc2021/day2/Day2.java)

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
                
             ???  50 79 88 34  0  ???                
             |  56 46  5 17 31  |
             |  29  6 38 78 68  | window size: 5
step size: 6 |  75 57 15 44 83  |
             |  89 45 43 85 72  ???
             ???
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

[NodeJS solution](nodejs/5/solution.mjs)

[Java solution](java/app/src/main/java/com/github/ggalmazor/aoc2021/day5/Day5.java)

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

![image](https://user-images.githubusercontent.com/205913/145049355-7a192730-8460-4522-a7d6-2b4e529bd8a9.png)
![image](https://user-images.githubusercontent.com/205913/145049264-ef8bd109-c010-496d-83ca-952e46adbedd.png)

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

## Day 6

[NodeJS solution](nodejs/6/solution.mjs)

Phew! That took a while.

I solved part 1 with a naive brute force approach where I iterate over every fish in the school and compute a new school for every day I need to, which proved to be a bad idea for part 2.

I tried to introduce several optimizations and workarounds for the eventual stacktrace or array size restrictions I was hitting before throwing away my initial approach.

It was clear that iterating fishes * days wasn't going to produce a result in a reasonable amount of time.

Finally, I realized that the behavior has a cyclic nature:

- Today + 0, fish that have 0 days initially in their timer, breed another fish that will breed in 0 + 9 days. They, in turn, breed again in 0 + 7 days.
- Today + 1, fish that have 1 days initially in their timer, breed another fish that will breed in 1 + 9 days. They, in turn, breed again in 1 + 7 days.
- Today + 2, fish that have 2 days initially in their timer, breed another fish that will breed in 2 + 9 days. They, in turn, breed again in 2 + 7 days.
- ...
- Today + 8, fish that have 8 days initially in their timer, breed another fish that will breed in 8 + 9 days. They, in turn, breed again in 8 + 7 days.
- Today + 0 + 9, fish that have 0 + 9 days initially in their timer, breed another fish that will breed in 0 + 9 + 9 days. They, in turn, breed again in 0 + 9 + 7 days.
- Today + 1 + 9, fish that have 1 + 9 days initially in their timer, breed another fish that will breed in 1 + 9 + 9 days. They, in turn, breed again in 1 + 9 + 7 days.
- etc, so on, so forth

At day 9 (aka 0+9), a cycle of length 9 starts again, which means that we can express everyday in terms of its `mod 9`.

Once I realized about this I pivoted towards having a count of "number of fish that breed at a particular breeding slot (day mod 9)". With this, every day, I could just increment the fish in the slot of `(today + 7) mod 9` by the number of fish breeding `today mod 9` which can be understood as:

- the fishes that breed today jump 7 slots ahead (or 2 back, however you want to see it)
- they leave as many new fish in the current slot (the new fish)

Not sure if this explanation will make sense to anybody other than me, though :shrug: :sweat_smile:

## Day 7

[NodeJS solution](nodejs/7/solution.mjs)

Today for part 2 I went directly to [maths](https://en.wikipedia.org/wiki/Triangular_number) to produce fuel consumptions for every position swap. I'm still feeling the pain from yesterday's event, I guess :D

## Day 8

### NodeJS

[NodeJS solution](nodejs/8/solution.mjs)

Most of the work this time involved getting a sequence of operations over the encoded segments in a line to get all individual segment translations, and then be able to translate them into numbers. I used this sequence:

- `[a] = segments(7) - segments(1)`
- `[dg] = [[3 numbers of length 5] - segments(7)] (take the one with 2 segments)`
- `[aeg] = [[3 numbers of length 5] - segments(4)] (take the one with 3 segments)`
- `[e] = [aeg] - [a] - [dg]`
- `[bdg] = [[[3 numbers of length 5] - segments(7)] - [e]] (take the one with 3 segments)`
- `[b] = [bdg] - [dg]`
- `[g] = [bdg] - segments(4)`
- `[d] = [dg] - [g]`
- Now we need to identify `segments(6)` (aka `[abdefg]`) by taking the original number among `[3 numbers of length 6]` that produces a 5 segments number in the set of `[[3 numbers of length 6] - segments(1)]`
- `[f] = [abdefg] - [a] - [b] - [d] - [e] - [g]`
- `[c] = segments(1) - [f]`

Visually:

```
a:
 ---     ??????     --- 
??   |   ??   |   ??   ??
 ??????  -  ??????  =  ?????? 
??   |   ??   |   ??   ??
 ??????     ??????     ?????? 
 
dg:
 ---   ---   ---     ---     ??????   ??????   ?????? 
??   | ??   | |   ??   ??   |   ??   ?? ??   ?? |   ??
 ---   ---   ---  -  ??????  =  ---   ---   --- 
|   ?? ??   | ??   |   ??   |   |   ?? ??   ?? ??   ??
 ---   ---   ---     ??????     ---   ---   --- 
                                  ^^^^^ pick this one
aeg:
 ---   ---   ---     ??????     ---   ---   --- 
??   | ??   | |   ??   |   |   ??   ?? ??   ?? ??   ??
 ---   ---   ---  -  ---  =  ??????   ??????   ?????? 
|   ?? ??   | ??   |   ??   |   |   ?? ??   ?? ??   ??
 ---   ---   ---     ??????     ---   ---   --- 
                            ^^^^^ pick this one
                            
```

etc.

This gives us a map from segments to encoded segments, and with the reversed map we can decode encoded numbers.

### Java

[Java solution](java/app/src/main/java/com/github/ggalmazor/aoc2021/day8/Day8.java)

I wanted to explore an approach that would first compute all 5040 permutations of `abcdef` and produce some kind of key that I would use to identify the specific permutation used to produce each line in the input.

It totally worked, which simplified the decoder quite a bit. The most complicated part is all the sorting of strings that's going on. Numbers in the input file are completely scrambled, which means I needed a consistent way of dealing with them by sorting their segments alphabetically.

## Day 9

[NodeJS solution](nodejs/9/solution.mjs)

Today I had more time than usual to think about how to approach part 2 and I'm happy with it, although I'm curious about other people's solutions, especially if they have game dev background.

Here are some basin plots I've created to visualize my progress. I mostly used this text-based visualization during my work on the solution:

![Biggest basin, in text mode](nodejs/9/basin0_text.png)

Then I cleaned up my solution before publishing it and I created the code to produce some nice PNGs with color gradients:

|.    |.    |
| --- | --- |
| No basin highlights | ![No basin highlights](nodejs/9/no_basins.png) |
| Biggest basin | ![Biggest basin](nodejs/9/basin0.png) |
| Second biggest basin | ![Second biggest basin](nodejs/9/basin1.png) |
| Third biggest basin | ![Third biggest basin](nodejs/9/basin2.png) |
| Three biggest basins | ![Three biggest basins](nodejs/9/3_basins.png) |
| All basins | ![All basins](nodejs/9/all_basins.png) |

## Days 11 and 12

[NodeJS solution - Day 11](nodejs/11/solution.mjs)

[NodeJS solution - Day 12](nodejs/12/solution.mjs)

These haven't been my best days. I'm really feeling tired and not up to the task due to a cold I'm going through but I managed to complete both events today.

Again, struggling with equality rules in NodeJS. My final solution feels a bit overengineered but it works.

I also played with ImageMagick and produced a couple of animated GIFs with Day 11 solutions:

|                                      | fps  | frames | GIF                                                              |
|--------------------------------------|------|--------|------------------------------------------------------------------|
| 1 frame = 1 step                     | 12.5 | 477    | ![1 frame per step @ 12.5 fps](nodejs/11/animation_steps_d8.gif) |
| 1 frame for every change in the grid | 50   | 7780   | ![1 frame per change @ 50 fps](nodejs/11/animation_d2.gif)       |

I'm not sure these gifs are being shown at the fps I set when I created them, though...

## Day 13

The `Grid` abstraction from previous days proved to be useful. I generated a couple of visualizations today too:

|                 |                                             |
|-----------------|---------------------------------------------|
| Part 2 result   | ![Reads "ZUJUAFHP"](nodejs/13/folded.png)   |
| Folds animation | ![folds animation](nodejs/13/animation.gif) |

## Day 17

This was a lot of work and finally I was able to solve both parts while throwing away 90% of the spikes I produced for it. I had the chance to play with generators, though.

I built a couple of generator functions that yield the x and y positions when provided with their respective velocities and drag/gravity values. What's interesting about them is that both series are infinite but the x positions series locks into a fixed value after n iterations due to the fact that drag will get `vx` to 0 eventually.

Dealing with infinite series makes iterating them much more interesting than normal lists. One has to think about them in terms of `take n elements from it` or `take elements while some condition is true`.

```javascript
function* xSeries(startVx, drag) {
  let x = 0;
  let vx = startVx;

  while (true) {
    const yieldValue = x;
    x += vx;
    vx = Math.max(0, vx - drag);
    yield yieldValue;
  }
}

function* ySeries(startVy, g) {
  let y = 0;
  let vy = startVy;

  while (true) {
    const yieldValue = y;
    y += vy;
    vy += g;
    yield yieldValue;
  }
}

function take(generator, count) {
  const numbers = [];
  while (numbers.length < count)
    numbers.push(generator.next().value)
  return numbers;
}

function takeWhile(generator, predicate) {
  const numbers = [];
  let number = generator.next().value;
  while (predicate(number)) {
    numbers.push(number)
    number = generator.next().value;
  }
  return numbers;
}
```


