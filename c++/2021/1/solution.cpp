#include <iostream>
#include <fstream>
#include <vector>

using namespace std;

vector<string> readInputLines() {
    fstream newfile;
    newfile.open("input", ios::in);

    vector<string> lines;
    if (newfile.is_open()) {
        string tp;
        while (getline(newfile, tp))
            lines.push_back(tp);
        newfile.close();
    } else
        throw std::runtime_error("Can't read input file");

    return lines;
}

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
    tuples.reserve(v.size() - 2);
    for (int i = 0; i < v.size() - 2; i++)
        tuples.push_back(slice(v, i, i + size));
    return tuples;
}

int runPart1(vector<string> &lines) {
    vector<vector<string>> pairs = window(lines, 2);
    int count = 0;
    for (auto &pair: pairs)
        count += (stoi(pair[0]) < stoi(pair[1])) ? 1 : 0;
    return count;
}

int runPart1Simple(vector<string> &lines) {
    int count = 0;
    for (int i = 0, maxI = (int) lines.size() - 2; i < maxI; i++) {
        count += (stoi(lines[i]) < stoi(lines[i + 1])) ? 1 : 0;
    }
    return count;
}

int runPart2(vector<string> &lines) {
    vector<vector<string>> tuples = window(lines, 3);
    vector<int> sums;
    sums.reserve(tuples.size());
    for (auto &tuple: tuples)
        sums.push_back(stoi(tuple[0]) + stoi(tuple[1]) + stoi(tuple[2]));
    vector<vector<int>> pairs = window(sums, 2);
    int count = 0;
    for (auto &pair: pairs)
        count += (pair[0] < pair[1]) ? 1 : 0;
    return count;
}


int main() {
    vector<string> lines = readInputLines();
    int count = runPart1Simple(lines);
    cout << count << endl;
    return 0;
}



