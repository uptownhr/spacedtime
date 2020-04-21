# SpacedTime
Remember the important things in life. Permanently store information in your brain, not the cloud. Using spaced time repetition techniques, we will create an app that allows you to easily recall and memorize. 

![SpacedTime Image](https://github.com/uptownhr/spacedtime/blob/master/static/spacedtime-terminal.gif)

## How to get started

```
1. yarn global add spacedtime
2. spacedtime add "What is my anniversary" "2010-10-10"
3. spacedtime recall //this will now pull a question for you to remember
```

## SpacedTime recall
This will ask you the question. Traditional time spaced repetition apps do not ask you input your answer. It only asks if you were able to remember. 

```
> spacedtime recall
What is your anniversary?

Press Any Key to Continue ...

"2010-10-10"

Did you remember successfully? yes(y) or no(n)
y

congrats, we are going to ask you again later in 60 minutes
```

Given how frequently you answer yes, the question will be asked less over time. If you answer no, you'll be asked this question more frequently.


## Youtube Video Learning Series
This project from start to finish has been documented through a series of youtube videos. They can be found on my channel [YoshiMoshi](https://www.youtube.com/channel/UCH1m4a3Kud_lx3eRlaZts5Q?view_as=subscriber)
