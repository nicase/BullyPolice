from Twitter import Twitter

if __name__ == '__main__':

    f = open("dictionaries/englishInsults.txt", "r")
    
    paraulesclau = f.readlines()

    f.close()

    f = open("dictionaries/topics.txt", "r")
    
    paraulesclau += f.readlines()

    f.close()
    
    index = 0

    paraulesEng = []
    for p in paraulesclau:
        if index % 4 == 0:
            paraulesEng.append(p[:-1].lower())
        index += 1

    # print(len(paraulesEng))
    # print(paraulesEng)

    #inicialitzem twitter
    Twitter(paraulesEng, 'en')
