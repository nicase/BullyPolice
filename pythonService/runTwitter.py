from Twitter import Twitter

if __name__ == '__main__':

    f = open("dictionaries/insultos.txt", "r")
    
    paraulesclau = f.readlines()

    f.close()

    f = open("dictionaries/topics.txt", "r")
    
    paraulesclau += f.readlines()

    f.close()
    
    index = 0
    for p in paraulesclau:
        paraulesclau[index] = p[:-1].lower()
        index += 1

    # print(paraulesclau)

    #inicialitzem twitter
    Twitter(paraulesclau)
